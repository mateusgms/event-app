import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherService } from './../../services/voucher.service';
import { EventService } from './../../services/event.service';
import { Voucher } from './../../models/voucher';
import { Event } from './../../models/event';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  quantity = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(2),
  ]);
  voucher = {} as Voucher;
  submitted = false;
  eventId: number;
  userId: number;
  showSpinner = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voucherService: VoucherService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.eventId = +params.get('eventId');
    });
    if (this.getEventAvaliable()) {
      this.getUserId();
      this.voucher.avaliable = false;
    } else {
      alert('Este evento não está mais disponível');
      this.router.navigate(['/event']);
    }
  }

  onSubmit(): any {
    this.submitted = true;
    this.voucher.quantity = this.quantity.value;
    this.voucherService.saveVoucher(this.voucher, this.userId, this.eventId);
    return this.router.navigate(['/dashboard']);
  }

  getEventAvaliable(): any {
    this.eventService.getEventById(this.eventId).subscribe(
      (event: Event) => {
        const date = new Date();
        // if (event.date.getTime() < date.getTime()) {
        //   return true; // false
        // }
        return true;
      },
      () => {
        this.error404();
      },
      () => {
        this.showSpinner = false;
      }
    );
    return true;
  }

  error404() {
    this.router.navigate(['/404']);
  }

  getUserId(): void {
    this.userId = 2;
  }
}
