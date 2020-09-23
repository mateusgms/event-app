import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import './../../../assets/smtp.js';
declare let Email: any;
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  subject = new FormControl('', [Validators.required]);
  ticket = new FormControl('', [Validators.required]);
  submitted = false;

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(): any {
    this.submitted = true;
    if (this.ticket.invalid) {
      return;
    }
    else {
      Email.send({
      SecureToken : '75348f08-8f25-4978-b948-896c498a3b78', // elasticmail xlxmarcosxlx
      To : 'eventapp@outlook.com.br',
      From : `eventapp@protonmail.com`,
      Subject : this.subject.value,
      Body : this.ticket.value

    }).then(
      message => alert(message)
    );
    }
  }

}
