import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  postId: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
    });

    if (this.postId === 0){
      this.newPostForm = this.formBuilder.group({

        title: ['', Validators.required],
        summary: ['', Validators.required],
        text: ['', [Validators.required]],
        category: ['', [Validators.required]],
        imageURL: ['', [Validators.required]],
        date: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

      });
    }else{
      this.getBlogById(this.postId);
      alert('Dados carregados em 3,2,1...');
      this.newPostForm = this.formBuilder.group({

        id: [this.postId],
        author: [this.post.author],
        title: [this.post.title, Validators.required],
        summary: [this.post.summary, Validators.required],
        text: [this.post.text, [Validators.required]],
        category: [this.post.category, [Validators.required]],
        imageURL: [this.post.imageURL, [Validators.required]],
        date: [this.post.date, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

      });
    }
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.newPostForm.controls; }

  onSubmit(): any {
    this.submitted = true;
    if (this.newPostForm.invalid) {
      alert('Formulário inválido');
      return;
    }
    else if (this.postId === 0){
      return this.blogService.saveBlog(this.post = this.newPostForm.value, 39).subscribe((post: Blog) => {
        this.post = post;

      });
    }
    else{
      return this.blogService.updateBlog(this.post = this.newPostForm.value).subscribe((post: Blog) => {
        this.post = post;
      });
    }
  }

  getUserById(userId: number): void{
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.user = user;
    });

  }

  getBlogById(postId: number): void {
    this.blogService.getBlogById(postId).subscribe((post: Blog) => {
      this.post = post;
    });
  }

}
