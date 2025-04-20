import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { ITicketInfoResponseModel } from '../../interfaces/ticket.model';
import { TicketPriorityLabel } from '../../enums/ticket-priority.enum';
import { EnumLabelPipe } from '@core/pipes/enum-label.pipe';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzFormControlComponent, NzFormDirective } from 'ng-zorro-antd/form';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { downloadFileHelper } from '@core/Utils/downloadFileHeper';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { RelativeTimePipe } from '@core/pipes/relative-time.pipe';

@Component({
  selector: 'admin-ticket-info',
  imports: [
    NzRowDirective,
    NzColDirective,
    EnumLabelPipe,
    NzInputDirective,
    FormsModule,
    NzFormDirective,
    NzButtonComponent,
    NzFormControlComponent,
    NzIconDirective,
    NzTooltipDirective,
    RelativeTimePipe,
  ],
  templateUrl: './ticket-info.component.html',
  styleUrl: './ticket-info.component.scss',
})
export class TicketInfoComponent implements OnInit {
  ticket!: ITicketInfoResponseModel;
  text: string | null = null;
  selectedFiles: File[] = [];
  protected readonly TicketPriorityLabel = TicketPriorityLabel;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(
    private ticketService: TicketService,
    private destroyRef: DestroyRef,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getTicketInfo();
  }

  scrollToBottom(): void {
    const container = this.scrollContainer?.nativeElement;
    if (container) container.scrollTop = container.scrollHeight;
  }

  getTicketInfo() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          return this.ticketService
            .ticket(+params['id'])
            .pipe(takeUntilDestroyed(this.destroyRef));
        }),
      )
      .subscribe((ticket) => (this.ticket = ticket));
  }

  reply(event: Event, model: string | null) {
    event.preventDefault();
    const formData = new FormData();
    if (model) formData.set('body', model);

    const lastTicketId =
      this.ticket.items[this.ticket.items.length - 1]?.ticketId ?? null;

    this.selectedFiles?.forEach((file) => {
      formData.set('file', file, file.name);
    });
    this.ticketService
      .replay(formData, this.ticket.ticketId, lastTicketId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.ticket.items.push({
            body: model,
            createDate: data.createDate,
            isSupport: true,
            ticketId: data.id,
            fileId: data.fileId,
          });
          this.text = null;
          this.selectedFiles = [];
          setTimeout(() => this.scrollToBottom(), 50);
        },
        error: () => {
          this.text = null;
          this.selectedFiles = [];
        },
      });
  }

  attachFile(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }

    this.reply(event, this.text);
  }

  download(fileId: number) {
    this.ticketService
      .download(fileId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((file) => {
        downloadFileHelper(file);
      });
  }
}
