import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit(): void {

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
  }

  // convenience getter for easy access to form fields
  get f() { return this.newEventForm.controls; }

  onSubmit(): any {
    this.submitted = true;
    if (this.newEventForm.invalid) {
      return;
    }
    else {
      return this.eventService.saveEvent(this.event = this.newEventForm.value).subscribe((event: Event) => {
        this.event = event;
      });
    }
  }
}
