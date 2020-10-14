import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Blog } from './../../models/blog';
import { BlogService } from './../../services/blog.service';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  post = {} as Blog;
  posts: Blog[];
  newPostForm: FormGroup;
  submitted = false;
  user: User;
  postId: number;
  userId: number;
  showSpinner = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private userService: UserService
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
      this.createPostForm(this.post);
      this.showSpinner = false;
    } else {
      this.getPostData();
    }
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.newPostForm.controls;
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.newPostForm.invalid) {
      alert('Formulário inválido');
      return;
    } else if (this.postId == null) {
      this.blogService
        .saveBlog((this.post = this.newPostForm.value), this.userId)
        .subscribe((post: Blog) => {
          this.post = post;
        });
      return this.error404();
    } else {
      this.blogService
        .updateBlog((this.post = this.newPostForm.value))
        .subscribe((post: Blog) => {
          this.post = post;
        });
      return this.error404();
    }
  }

  getPostById(postId: number): any {
    return new Promise((resolve) => {
      this.blogService.getBlogById(postId).subscribe(
        (post: Blog) => {
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

  createPostForm(post: Blog): any {
    this.newPostForm = this.formBuilder.group({
      id: [this.postId],
      author: [post.author], // Tirar o author depois de ter tirado no back
      title: [post.title, Validators.required],
      summary: [post.summary, Validators.required],
      text: [post.text, [Validators.required]],
      category: [post.category, [Validators.required]],
      imageURL: [post.imageURL, [Validators.required]],
      date: [
        post.date,
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
    });
  }

  getAuthor() {
    this.userId = 39; // TODO - pegar userId da seção
  }

  error404(): void {
    this.router.navigate(['/404']);
  }

  async getPostData() {
    try {
      await this.getPostById(this.postId);
      await this.createPostForm(this.post);
    } catch {
      this.error404();
    }
  }
}
