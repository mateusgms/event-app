import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from './../../models/post';
import { PostService } from './../../services/post.service';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  post = {} as Post;
  posts: Post[];
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
    private postService: PostService,
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
    alert(JSON.stringify(this.newPostForm.value));
    this.submitted = true;
    if (this.newPostForm.invalid) {
      alert('Formulário inválido');
      return;
    } else if (this.postId == null) {
      this.getAuthor();
      this.postService
        .savePost((this.post = this.newPostForm.value), this.userId)
        .subscribe(
          (post: Post) => {
            this.post = post;
          },
          () => {
            return alert('Erro de Conexão com o banco');
          },
          () => {
            alert('Post cadastrado!');
            alert(this.post.id);
            this.router.navigate(['/post/' + this.post.id]);
          }
        );
    } else {
      this.postService
        .updatePost((this.post = this.newPostForm.value))
        .subscribe(
          (post: Post) => {
            this.post = post;
          },
          () => {
            return alert('Erro de Conexão com o banco');
          },
          () => {
            alert('Post alterado!');
            this.router.navigate(['/post/' + this.postId]);
          }
        );
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
          alert('Erro de Conexão com o banco');
          this.showSpinner = false;
        },
        () => {
          this.showSpinner = false;
        }
      );
    });
  }

  createPostForm(post: Post): any {
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

  getAuthor(): void {
    this.userId = 9; // TODO - pegar userId da seção
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
