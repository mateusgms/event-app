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
  showSpinner = true;

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
      this.getPostData(this.postId);
    }
  }

  getBlogById(postId: number): any {
    return new Promise((resolve) => {
      this.blogService.getBlogById(postId).subscribe((post: Blog) => {
        this.post = post;
        this.showSpinner = false;
        resolve(this.post);
      });
    });
  }

  error404(): void {
    alert('Post não encontrado'); // 404
    this.router.navigate(['/post']);
  }

  async getPostData(postId: number) {
    try {
      await this.getBlogById(postId);
      if (this.post == null) {
        this.error404();
      }
    } catch {
      this.error404();
    }
  }
}
