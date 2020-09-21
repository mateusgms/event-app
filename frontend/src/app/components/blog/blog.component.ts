import { Component, OnInit } from '@angular/core';

import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  post = {} as Blog;
  posts: Blog[];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.posts = blogs;
    });
  }

}
