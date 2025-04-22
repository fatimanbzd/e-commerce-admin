import { Component, DestroyRef, inject } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NZ_MODAL_DATA,
  NzModalFooterDirective,
  NzModalRef,
} from 'ng-zorro-antd/modal';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../../../shared/services/notification.service';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';

@Component({
  selector: 'admin-vendor-message-dialog',
  imports: [NzButtonComponent, NzModalFooterDirective, PersianDatePipe],
  templateUrl: './vendor-message-dialog.component.html',
  styleUrl: './vendor-message-dialog.component.scss',
})
export class VendorMessageDialogComponent {
  readonly data = inject(NZ_MODAL_DATA);

  constructor(
    private modal: NzModalRef,
    private messageService: NotificationService,
    private destroyRef: DestroyRef,
  ) {}

  handleCancel(): void {
    this.modal.destroy();
  }

  readMessage() {
    if (!this.data.isRead)
      this.messageService
        .readNotification(this.data.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.messageService.setMessageRead();
            this.data.isRead = true;
            this.modal.close(true);
          },
        });
    else this.modal.close(false);
  }
}
