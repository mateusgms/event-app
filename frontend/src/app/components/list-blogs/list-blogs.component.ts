import { Component, OnInit } from '@angular/core';

import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css'],
})
export class ListBlogsComponent implements OnInit {
  post = {} as Blog;
  posts: Blog[];
  displayedColumns: string[] = ['imageURL', 'title', 'actions'];
  showSpinner = true;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe(
      (blogs: Blog[]) => {
        this.posts = blogs;
      },
      () => {}, // errors
      () => {
        this.showSpinner = false;
      }
    );
  }

  deleteBlog(post: Blog): any {
    return new Promise((resolve) => {
      this.blogService.deleteBlog(post).subscribe(
        () => {
          this.post = post;
          resolve(this.post);
        },
        () => {}, // errors
        () => {
          window.location.reload();
        }
      );
    });
  }

  onClick(post: Blog) {
    if (confirm('Deletar este post?')) {
      this.deleteBlog(post);
    }
  }
}
