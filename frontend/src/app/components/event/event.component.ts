import { Component, OnInit } from '@angular/core';

import { EventService } from './../../services/event.service';
import { Event } from './../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  showSpinner = true;
  event = {} as Event;
  events: Event[];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): any {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      () => {
        alert('erro de conexão com o banco');
        this.showSpinner = false;
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
