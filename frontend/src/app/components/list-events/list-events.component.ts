import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  event = {} as Event;
  events: Event[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents() {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }
  deleteEvent(event: Event){
    this.eventService.deleteEvent(event).subscribe(()=> {
      this.getEvents();
    });
  }
}
