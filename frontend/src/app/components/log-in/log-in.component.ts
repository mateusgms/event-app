import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MustMatch } from '../../_helpers/must-match.validator';
import { UserService } from './../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  hide3 = true;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  user = {} as User;
  users: User[];

  loginForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    // private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        date: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
            ),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required]],
        address: ['', [Validators.required]],
        uf: ['', [Validators.required, Validators.maxLength(2)]],
        country: ['', [Validators.required]],
        isAdmin: [false],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onSubmit(): any {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    } else {
      return this.userService
        .saveUser((this.user = this.registerForm.value))
        .subscribe((user: User) => {
          this.user = user;
        });
    }
  }

  loginSubmit(): void {
    // const val = this.loginForm.value;
    // if (this.loginForm.invalid) {
    //   alert('deu ruim');
    //   return;
    // } else {
    //   if (val.email && val.password) {
    //     this.authService.login(val.email, val.password).subscribe(
    //       (user: User) => {
    //         this.user = user;
    //         this.cookieService.set('user', this.user.token);
    //         alert('User logado');
    //       },
    //       () => {
    //         alert('Erro no Login');
    //       }, // errors
    //       () => {
    //         this.router.navigateByUrl('/dashboard');
    //       }
    //     );
    //   }
    // }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
