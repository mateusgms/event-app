import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  event = {} as Event;
  events: Event[];
  displayedColumns: string[] = [ 'imgURL', 'title'];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }
  deleteEvent(event: Event): void {
    this.eventService.deleteEvent(event).subscribe(() => {
      this.getEvents();
    });
  }
}
