import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../../_helpers/must-match.validator';
import {UserService} from './../../services/user.service'
import { User } from './../../models/user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit{
  hide = true;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  user = {} as User;
  users: User[];

  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
     ) { }


  


  ngOnInit(): void {
    
    this.getUsers();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone:['', [Validators.required, ]],
      address:['', [Validators.required]],
      uf:['', [Validators.required, Validators.maxLength(2)]],
      country: ['', [Validators.required]],

      
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return ;
    }
    else{
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      return this.userService.saveUser(this.user).subscribe()
    }
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}