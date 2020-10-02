import { Component, OnInit } from '@angular/core';

import { slides } from '../../slides';
import { EventService } from './../../services/event.service';
import { Event } from './../../models/event';
import { BlogService } from './../../services/blog.service';
import { Blog } from './../../models/blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: any;
  event = {} as Event;
  events: Event[];
  post = {} as Blog;
  posts: Blog[];
  showSpinner1 = true;
  showSpinner2 = true;
  showSpinner3 = true;

  constructor(
    private eventService: EventService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.getSlides();
    this.getEvents();
    this.getBlogs();
  }

  getSlides(): void {
    this.slides = slides;
    this.showSpinner1 = false;
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.showSpinner2 = false;
    });
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.posts = blogs;
      this.showSpinner3 = false;
    });
  }
}
