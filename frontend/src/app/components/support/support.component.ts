import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  ticket = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

}
