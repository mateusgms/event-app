import { Component, OnInit } from '@angular/core';

import { slides } from '../../slides';
import { EventService } from 'src/app/services/event.service';
import { Event } from './../../models/event';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from './../../models/blog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = slides;
  event = {} as Event;
  events: Event[];
  post = {} as Blog;
  posts: Blog[];

  constructor(
    private eventService: EventService,
    private blogService: BlogService
    ) { }

  ngOnInit(): void {
    this.getEvents();
    this.getBlogs();
  }
  getEvents(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
    });
  }
  getBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.posts = blogs;
    });
  }

}
