import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Voucher } from './../../models/voucher';
import { VoucherService } from './../../services/voucher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user = {} as User;
  voucher = {} as Voucher;
  vouchers: Voucher[];
  userId: number;
  showSpinner = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private voucherService: VoucherService
  ) {}

  ngOnInit(): void {
    this.userId = 2; // Get from session
    this.loadData();
  }

  getUserById() {
    return new Promise((resolve) => {
      this.userService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user;
          resolve(this.user);
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

  getVouchersByUser() {
    return new Promise((resolve) => {
      this.voucherService
        .getVouchers() // (this.userId) // getVouchersByUser
        .subscribe(
          (vouchers: Voucher[]) => {
            this.vouchers = vouchers;
            resolve(this.voucher);
          },
          () => {
            //this.error404();
          },
          () => {
            this.showSpinner = false;
          }
        );
    });
  }

  error404() {
    this.router.navigate(['/404']);
  }

  async loadData() {
    try {
      await this.getUserById();
      await this.getVouchersByUser();
    } catch {
      alert('error');
      this.router.navigate(['/login']);
    }
  }
}
