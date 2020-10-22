import { Component, OnInit } from '@angular/core';

import { slides } from '../../slides';
import { EventService } from './../../services/event.service';
import { Event } from './../../models/event';
import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  slides: any;
  event = {} as Event;
  events: Event[];
  post = {} as Post;
  posts: Post[];
  showSpinner1 = true;
  showSpinner2 = true;
  showSpinner3 = true;

  constructor(
    private eventService: EventService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getSlides();
    this.getEvents();
    this.getPosts();
  }

  getSlides(): void {
    this.slides = slides;
    this.showSpinner1 = false;
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      () => {
        alert('Erro de conexão com o banco');
        this.showSpinner2 = false;
      },
      () => {
        this.showSpinner2 = false;
      }
    );
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      () => {}, // errors
      () => {
        this.showSpinner3 = false;
      }
    );
  }
}
