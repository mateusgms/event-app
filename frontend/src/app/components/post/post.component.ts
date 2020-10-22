import { Component, OnInit } from '@angular/core';

import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post = {} as Post;
  posts: Post[];
  showSpinner = true;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      () => {
        alert('erro de conexão com o banco');
        this.showSpinner = false;
      },
      () => {
        this.showSpinner = false;
      }
    );
  }
}
