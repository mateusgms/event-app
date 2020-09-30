import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from './../../services/blog.service';
import { Blog } from './../../models/blog';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  post: Blog;
  postId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('postId')) {
        this.postId = +params.get('postId');
      } else {
        this.postId = null;
      }
    });
    if (this.postId == null || isNaN(this.postId)) {
      this.error404();
    } else {
      this.getBlogById(this.postId);
      // if (this.event == null) {
      //   this.error404();
      // }
    }
  }
  // TODO - async
  getBlogById(postId: number): void {
    this.blogService.getBlogById(postId).subscribe((post: Blog) => {
      this.post = post;
    });
  }

  error404(): void {
    alert('Post não encontrado'); // 404
    this.router.navigate(['/post']);
  }
}
