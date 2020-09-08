import { Component, OnInit } from '@angular/core';

import { slides } from '../../slides';
import { events } from '../../events';
import { posts } from '../../posts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = slides;
  events = events;
  posts = posts;

  constructor() { }

  ngOnInit(): void {
  }

}
