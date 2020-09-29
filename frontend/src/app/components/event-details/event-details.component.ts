import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventService } from './../../services/event.service';
import { Event } from './../../models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  eventId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      this.error404();
    } else {
      this.getEventById(this.eventId);
      // if (this.event == null) {
      //   this.error404();
      // }
    }
  }
  // TODO - async
  getEventById(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe((event: Event) => {
      this.event = event;
    });
  }

  error404(): void {
    alert('Evento não encontrado'); // 404
    this.router.navigate(['/event']);
  }
}
