import { Component, OnInit } from '@angular/core';
import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {
  blog = {} as Blog;
  blogs: Blog[];
  displayedColumns: string[] = [ 'imgURL', 'title'];

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlogs();
  }
  getBlogs(): void {
    this.blogService.getBlogs().subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
  }
  deleteBlog(blog: Blog): void{
    this.blogService.deleteBlog(blog).subscribe(() => {
      this.getBlogs();
    });
  }

}
