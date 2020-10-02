import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from './../../models/event';
import { EventService } from './../../services/event.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
})
export class ListEventsComponent implements OnInit {
  event = {} as Event;
  events: Event[];
  displayedColumns: string[] = ['imageURL', 'title', 'actions'];
  showSpinner = true;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.showSpinner = false;
    });
  }

  deleteEvent(event: Event): any {
    return new Promise((resolve) => {
      this.eventService.deleteEvent(event).subscribe(() => {
        this.event = event;
      });
      resolve(this.event);
    });
  }

  refresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve(this.event);
      }, 1500);
    });
  }

  async onClick(event: Event) {
    if (confirm('Deletar este evento?')) {
      await this.deleteEvent(event);
      await this.refresh();
    }
  }
}
