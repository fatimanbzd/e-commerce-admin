import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Subject, takeUntil } from 'rxjs';
import { ICustomerResponseModel } from '../../interfaces/customer.model';

@Component({
    selector: 'admin-customer-detail',
    imports: [],
    templateUrl: './customer-detail.component.html',
    styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit, OnDestroy {
  private id!: number;
  customer!: ICustomerResponseModel;
  private _destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.customerService
      .customer(this.id)
      .pipe(takeUntil(this._destroy))
      .subscribe((customer) => (this.customer = customer));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
