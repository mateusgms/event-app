import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from './../../services/post.service';
import { Post } from './../../models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post;
  postId: number;
  showSpinner = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
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

  getPostById(postId: number): any {
    return new Promise((resolve) => {
      this.postService.getPostById(postId).subscribe(
        (post: Post) => {
          this.post = post;
          resolve(this.post);
        },
        () => {
          this.error404();
        },
        () => {
          this.showSpinner = false;
        }
      );
    });
  }

  error404(): void {
    this.router.navigate(['/404']);
  }

  async getPostData(postId: number) {
    try {
      await this.getPostById(postId);
      if (this.post == null) {
        this.error404();
      }
    } catch {
      alert(this.post);
      this.error404();
    }
  }
}
