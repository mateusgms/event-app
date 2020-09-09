import { Component, OnInit} from '@angular/core';

import { events } from '../../events';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events = events;

  constructor() { }

  ngOnInit(): void {
  }

}
