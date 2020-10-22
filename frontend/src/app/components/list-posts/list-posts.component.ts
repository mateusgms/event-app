import { Component, OnInit } from '@angular/core';

import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent implements OnInit {
  post = {} as Post;
  posts: Post[];
  displayedColumns: string[] = ['imageURL', 'title', 'actions'];
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
        alert('Erro de conexão com o banco');
        this.showSpinner = false;
      },
      () => {
        this.showSpinner = false;
      }
    );
  }

  deletePost(post: Post): any {
    return new Promise((resolve) => {
      this.postService.deletePost(post).subscribe(
        () => {
          this.post = post;
          resolve(this.post);
        },
        () => {
          alert('Erro de conexão com o banco');
        },
        () => {
          window.location.reload();
        }
      );
    });
  }

  onClick(post: Post): void {
    if (confirm('Deletar este post?')) {
      this.deletePost(post);
    }
  }
}
