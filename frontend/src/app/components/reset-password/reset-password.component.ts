import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  password = new FormControl('', [Validators.required]);
  rePassword = new FormControl('', [Validators.required]);
  submitted = false;
  userId: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getUserId();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.rePassword.invalid) {
      return;
    } else {
      // resetPasswordService.resetPassword(this.rePassword, this.userId).subscribe(response: boolean)=>{ this.response = response };
      alert('senha alterada');
      this.router.navigate(['/login']);
    }
  }

  getUserId(): void {
    this.userId = 2; // Get from checksum
  }
}
