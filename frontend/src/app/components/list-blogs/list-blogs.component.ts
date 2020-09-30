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

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.posts = blogs;
    });
  }

  deleteBlog(post: Blog): any {
    return new Promise((resolve) => {
      this.blogService.deleteBlog(post).subscribe(() => {
        this.post = post;
      });
      resolve(this.post);
    });
  }

  refresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        window.location.reload();
        resolve(this.post);
      }, 1500);
    });
  }

  async onClick(post: Blog) {
    if (confirm('Deletar este post?')) {
      await this.deleteBlog(post);
      await this.refresh();
    }
  }
}
