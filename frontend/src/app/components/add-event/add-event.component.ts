import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event = {} as Event;
  events: Event[];
  newEventForm: FormGroup;
  submitted = false;
  eventId: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('eventId');
    });

    if (this.eventId === 0){
      this.newEventForm = this.formBuilder.group({

        title: ['', Validators.required],
        description: ['', Validators.required],
        address: ['', [Validators.required]],
        uf: ['', [Validators.required, Validators.maxLength(2)]],
        country: ['', [Validators.required]],
        imageURL: ['', [Validators.required]],
        value: ['', [Validators.required]],
        date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

      });
    }else{
      this.getEventById(this.eventId);
      alert('Dados carregados em 3,2,1...');
      this.newEventForm = this.formBuilder.group({

        id: [this.eventId],
        title: [this.event.title, Validators.required],
        description: [this.event.description, Validators.required],
        address: [this.event.address, [Validators.required]],
        uf: [this.event.uf, [Validators.required, Validators.maxLength(2)]],
        country: [this.event.country, [Validators.required]],
        imageURL: [this.event.imageURL, [Validators.required]],
        value: [this.event.value, [Validators.required]],
        date: [this.event.date, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
    });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.newEventForm.controls; }

  onSubmit(): any {
    this.submitted = true;
    if (this.newEventForm.invalid) {
      alert('Formulário inválido');
      return;
    }
    else if (this.eventId === 0){
      return this.eventService.saveEvent(this.event = this.newEventForm.value).subscribe((event: Event) => {
        this.event = event;
      });
    }
    else {
      return this.eventService.updateEvent(this.event = this.newEventForm.value).subscribe((event: Event) => {
        this.event = event;
      });

    }
  }

  getEventById(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe((event: Event) => {
      this.event = event;
    });
  }
}
