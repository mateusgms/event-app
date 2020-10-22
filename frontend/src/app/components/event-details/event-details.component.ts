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
  showSpinner = true;

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
    }
    this.getEventData(this.eventId);
  }

  getEventById(eventId: number): any {
    return new Promise((resolve) => {
      this.eventService.getEventById(eventId).subscribe(
        (event: Event) => {
          this.event = event;
          resolve(this.event);
        },
        () => {
          this.error404();
        },
        () => {
          this.showSpinner = false;
        }
      );
    });
  }

  error404(): void {
    this.router.navigate(['/404']);
  }

  async getEventData(eventId: number): Promise<void> {
    try {
      await this.getEventById(eventId);
      if (this.event == null) {
        this.error404();
      }
    } catch {
      this.error404();
    }
  }
}
