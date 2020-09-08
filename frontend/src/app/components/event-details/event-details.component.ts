import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { events } from '../../events';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.event = events[+params.get('eventId')];
    });
  }

}
