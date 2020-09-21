import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService } from './../../services/event.service';
import { Event } from './../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getEventById(+params.get('eventId'));
    });
  }
  getEventById(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe((event: Event) => {
      this.event = event;
    });
  }
}
