import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[digitNumber]',
  standalone: true,
})
export class DigitNumberDirective {
  numbersRegex: RegExp = /^[0-9]{1}$/;
  element: HTMLInputElement;
  oldBrowser!: boolean;

  @Output() newVal: EventEmitter<number> = new EventEmitter<number>();
  @Output() focusNext: EventEmitter<any> = new EventEmitter();
  @Output() focusPrevious: EventEmitter<any> = new EventEmitter();
  @Output() focusFirst: EventEmitter<any> = new EventEmitter();
  @Output() focusLast: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Unidentified') {
      event.preventDefault();

      if (this.numbersRegex.test(event.key)) {
        this.element.value = event.key;
        this.newVal.emit(Number(event.key));
        return this.focusNext.emit();
      }

      const fieldSwitchingKey = [
        'Backspace',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight',
        'Delete',
      ];

      if (fieldSwitchingKey.indexOf(event.key) !== -1) {
        switch (event.key) {
          case 'Backspace': {
            this.setValueEmpty();
            break;
          }
          case 'Tab': {
            this.focusNext.emit();
            break;
          }
          case 'End': {
            this.focusLast.emit();
            break;
          }
          case 'Home': {
            this.focusFirst.emit();
            break;
          }
          case 'ArrowLeft': {
            this.focusPrevious.emit();
            break;
          }
          case 'ArrowRight': {
            this.focusNext.emit();
            break;
          }
          case 'Delete': {
            this.setValueEmpty();
            break;
          }
        }
      }
    } else {
      this.oldBrowser = true;
    }
  }

  @HostListener('input', ['$event'])
  onTextInsert(event: any) {
    if (this.oldBrowser) {
      event.preventDefault();

      if (this.numbersRegex.test(event.data)) {
        this.element.value = event.data;
        this.newVal.emit(Number(event.data));
        return this.focusNext.emit();
      }
    }
  }

  private setValueEmpty(): void {
    if (this.element.value) {
      this.element.value = '';
      this.newVal.emit();
    } else {
      this.focusPrevious.emit();
    }
  }
}
