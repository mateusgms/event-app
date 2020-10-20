import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl('', [Validators.required]);
  submitted = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    if (this.email.invalid) {
      return;
    } else {
      alert('Um email foi enviado com o link para alteração de senha.');
      this.router.navigate(['/reset']);
    }
  }
}
