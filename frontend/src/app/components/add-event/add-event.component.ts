import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  event = {} as Event;
  events: Event[];
  newEventForm: FormGroup;
  submitted = false;
  eventId: number;
  showSpinner = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('eventId')) {
        this.eventId = +params.get('eventId');
      } else {
        this.eventId = null;
      }
    });

    if (this.eventId == null || isNaN(this.eventId)) {
      this.createEventForm(this.event);
      this.showSpinner = false;
    } else {
      this.getEventData();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newEventForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.newEventForm.invalid) {
      alert('Formulário inválido');
      return;
    } else if (this.eventId == null) {
      this.eventService
        .saveEvent((this.event = this.newEventForm.value))
        .subscribe((event: Event) => {
          this.event = event;
        });
      return this.router.navigate(['/listevents']);
    } else {
      this.eventService
        .updateEvent((this.event = this.newEventForm.value))
        .subscribe((event: Event) => {
          this.event = event;
        });
      return this.router.navigate(['/listevents']);
    }
  }

  getEventById(eventId: number): any {
    return new Promise((resolve) => {
      this.eventService.getEventById(eventId).subscribe((event: Event) => {
        this.event = event;
        resolve(this.event);
      });
    });
  }

  createEventForm(event: Event): any {
    this.newEventForm = this.formBuilder.group({
      id: [this.eventId],
      title: [event.title, Validators.required],
      description: [event.description, Validators.required],
      address: [event.address, [Validators.required]],
      uf: [event.uf, [Validators.required, Validators.maxLength(2)]],
      country: [event.country, [Validators.required]],
      imageURL: [event.imageURL, [Validators.required]],
      value: [event.value, [Validators.required]],
      date: [
        event.date,
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
    });
    this.showSpinner = false;
  }

  async getEventData() {
    try {
      await this.getEventById(this.eventId);
      await this.createEventForm(this.event);
    } catch {
      alert('Evento não encontrado');
      this.router.navigate(['/listevents']);
    }
  }
}
