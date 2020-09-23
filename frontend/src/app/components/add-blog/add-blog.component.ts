import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  post = {} as Blog;
  posts: Blog[];
  newPostForm: FormGroup;
  submitted = false;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.getUserById(39);
    this.newPostForm = this.formBuilder.group({
      author: [this.user],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      text: ['', [Validators.required]],
      category: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
      date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

    });
    this.newPostForm.patchValue({author: this.user});
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.newPostForm.controls; }

  onSubmit(): any {
    this.submitted = true;
    if (this.newPostForm.invalid) {
      return;
    }
    else {
      return this.blogService.saveBlog(this.post = this.newPostForm.value, 39).subscribe((post: Blog) => {
        this.post = post;

      });
    }
  }

  getUserById(userId: number): void{
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
    });

  }

}
