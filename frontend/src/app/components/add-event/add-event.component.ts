import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event = {} as Event;
  events: Event[];
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService
    ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({

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
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return ;
    }
    else{
      return this.eventService.saveEvent(this.event).subscribe();
    }
  }
}
