import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { IOrderDetailProductModel } from '../../interfaces/order-detail.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { PricePipe } from '@core/pipes/price.pipe';
import {
  InvoiceItemStatusEnum,
  InvoiceItemStatusLabel,
} from '@core/enums/invoice-item-status.enum';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import {
  IInvoiceItemDeliveryEnum,
  InvoiceItemDeliveryLabel,
} from '@core/enums/incoice-item-delivery.enum';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { EnumConvertorUtils } from '@core/Utils/EnumConvertoModel';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Utilities } from '@core/Utils/utilities';
import { IChangeOrderStatusModel } from '../../interfaces/change-order-status.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PersianDatePipe } from '@core/pipes/persian-date.pipe';
import { NzRibbonComponent } from 'ng-zorro-antd/badge';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'admin-view-order-dialog',
  imports: [
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    ReactiveFormsModule,
    FormsModule,
    PricePipe,
    EnumLabelPipe,
    NzRadioGroupComponent,
    NzRadioComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    NzOptionComponent,
    NzSelectComponent,
    NzButtonComponent,
    NzFormDirective,
    PersianDatePipe,
    NzRibbonComponent,
    NzCardComponent,
    NzTooltipDirective,
  ],
  templateUrl: './view-order-dialog.component.html',
  styleUrl: './view-order-dialog.component.scss',
})
export class ViewOrderDialogComponent implements OnInit {
  today: Date = new Date();
  shipmentNumber: string = '';
  deliveredCode: string = '';

  isConfirmLoading = false;
  readonly nzModalData = inject(NZ_MODAL_DATA);
  invoiceId!: number;
  data!: IOrderDetailProductModel;

  invoiceItemStatusList1 = Object.keys(InvoiceItemStatusEnum)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key) as InvoiceItemStatusEnum)
    .filter(
      (status) =>
        status === InvoiceItemStatusEnum.accepted ||
        status === InvoiceItemStatusEnum.lackOfSupply,
    )
    .map((status) => ({
      label: InvoiceItemStatusLabel[status],
      value: status,
    }));

  protected readonly InvoiceItemStatusLabel = InvoiceItemStatusLabel;
  protected readonly InvoiceItemDeliveryLabel = InvoiceItemDeliveryLabel;
  protected readonly IInvoiceItemDeliveryEnum = IInvoiceItemDeliveryEnum;
  protected readonly InvoiceItemStatusEnum = InvoiceItemStatusEnum;

  invoiceItemDeliveryList = EnumConvertorUtils.enumToListModel(
    InvoiceItemDeliveryLabel,
  );

  form: FormGroup = this.fb.group({
    deliveryType: [null, [Validators.required]],
    deliveryTime: [null, [Validators.required]],
    deliveryDate: [null, [Validators.required]],
    sendStatus: [null, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private modal: NzModalRef,
    private destroyRef: DestroyRef,
    private toaster: ToastrService,
  ) {
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.invoiceId = this.nzModalData.invoiceId;
    this.data = this.nzModalData.data;

    this.form.get('sendStatus')?.valueChanges.subscribe((value) => {
      if (value === InvoiceItemStatusEnum.accepted) {
        this.form.get('deliveryType')?.setValidators(Validators.required);
        this.form.get('deliveryTime')?.setValidators(Validators.required);
        this.form.get('deliveryDate')?.setValidators(Validators.required);
      } else {
        this.form.get('deliveryType')?.clearValidators();
        this.form.get('deliveryTime')?.clearValidators();
        this.form.get('deliveryDate')?.clearValidators();
      }
      this.form.get('deliveryType')?.updateValueAndValidity();
      this.form.get('deliveryTime')?.updateValueAndValidity();
      this.form.get('deliveryDate')?.updateValueAndValidity();
    });

    this.form.get('deliveryType')?.valueChanges.subscribe((value) => {
      if (value === IInvoiceItemDeliveryEnum.SendByCourier) {
        this.form.get('deliveryTime')?.setValidators(Validators.required);
        this.form.get('deliveryDate')?.setValidators(Validators.required);
      } else {
        this.form.get('deliveryTime')?.clearValidators();
        this.form.get('deliveryDate')?.clearValidators();
      }
      this.form.get('deliveryTime')?.updateValueAndValidity();
      this.form.get('deliveryDate')?.updateValueAndValidity();
    });
  }

  onDiscountExpireDateChange(event: any) {
    const selectedDate = new Date(event.value);
    if (selectedDate < this.today) {
      this.form.get('deliveryDate')?.setValue(this.today);
    } else {
      selectedDate.setHours(12, 0, 0, 0);
      this.form.get('deliveryDate')?.setValue(selectedDate);
    }
  }

  changeUnderReview(form: IChangeOrderStatusModel) {
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }
    this.isConfirmLoading = true;

    const model: Partial<IChangeOrderStatusModel> = {
      sendStatus: form.sendStatus,
    };

    if (form.sendStatus === InvoiceItemStatusEnum.accepted) {
      model.deliveryType = form.deliveryType;
    }

    if (form.deliveryType === IInvoiceItemDeliveryEnum.SendByCourier) {
      model.deliveryDate = form.deliveryDate;
      model.deliveryTime = form.deliveryTime;
    }

    this.orderService
      .updateOrderItemStatus(this.invoiceId, this.data.invoiceItemId, model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.toaster.success('وضعیت ارسال با موفقیت ثبت شد.');
          this.modal.close(model);
        },
      });
  }

  changeAccept() {
    this.isConfirmLoading = true;
    const model: Partial<IChangeOrderStatusModel> = {
      sendStatus: InvoiceItemStatusEnum.waitingToSend,
    };

    this.orderService
      .updateOrderItemStatus(this.invoiceId, this.data.invoiceItemId, model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.toaster.success('وضعیت ارسال به منتظر ارسال تغییر پیدا کرد.');
          this.modal.close(model);
        },
      });
  }

  changeWaitingToSend() {
    this.isConfirmLoading = true;
    const model: Partial<IChangeOrderStatusModel> = {
      sendStatus: InvoiceItemStatusEnum.sent,
      shipmentNumber: this.shipmentNumber,
    };

    this.orderService
      .updateOrderItemStatus(this.invoiceId, this.data.invoiceItemId, model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.toaster.success('وضعیت ارسال به ارسال شده تغییر پیدا کرد.');
          this.modal.close(model);
        },
      });
  }

  changeSent() {
    this.isConfirmLoading = true;
    const model: Partial<IChangeOrderStatusModel> = {
      sendStatus: InvoiceItemStatusEnum.delivered,
      deliveredCode: this.deliveredCode,
    };

    this.orderService
      .updateOrderItemStatus(this.invoiceId, this.data.invoiceItemId, model)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isConfirmLoading = false)),
      )
      .subscribe({
        next: () => {
          this.toaster.success('وضعیت ارسال به تحویل داده شده تغییر پیدا کرد.');
          this.modal.close(model);
        },
      });
  }
}
