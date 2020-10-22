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

  onSubmit(): any {
    this.submitted = true;
    if (this.newEventForm.invalid) {
      alert('Formulário inválido');
      return;
    } else if (this.eventId == null) {
      this.eventService
        .saveEvent((this.event = this.newEventForm.value))
        .subscribe(
          (event: Event) => {
            this.event = event;
          },
          () => {
            return alert('Erro de Conexão com o banco');
          },
          () => {
            alert('Evento cadastrado!');
            this.router.navigate(['/event/' + this.event.id]);
          }
        );
      return this.error404();
    } else {
      this.eventService
        .updateEvent((this.event = this.newEventForm.value))
        .subscribe(
          (event: Event) => {
            this.event = event;
          },
          () => {
            return alert('Erro de Conexão com o banco');
          },
          () => {
            alert('Evento alterado!');
            this.router.navigate(['/event/' + this.eventId]);
          }
        );
    }
  }

  getEventById(eventId: number): any {
    return new Promise((resolve) => {
      this.eventService.getEventById(eventId).subscribe(
        (event: Event) => {
          this.event = event;
          resolve(this.event);
        },
        () => {
          alert('Erro de Conexão com o banco');
          this.showSpinner = false;
        },
        () => {
          this.showSpinner = false;
        }
      );
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
  }

  error404(): void {
    this.router.navigate(['/404']);
  }

  async getEventData(): Promise<void> {
    try {
      await this.getEventById(this.eventId);
      await this.createEventForm(this.event);
    } catch {
      this.error404();
    }
  }
}
