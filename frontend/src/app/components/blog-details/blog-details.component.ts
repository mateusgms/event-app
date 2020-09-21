import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogService } from './../../services/blog.service';
import { Blog } from './../../models/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  post: Blog;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getBlogById(+params.get('postId'));
    });
  }
  getBlogById(postId: number): void {
    this.blogService.getBlogById(postId).subscribe((post: Blog) => {
      this.post = post;
    });
    }
}
