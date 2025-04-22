import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[faCharOnly]',
  standalone: true,
})
export class FaCharOnlyDirective {
  key: any;
  private persianNumbersRegex = /^[\u0600-\u06FF0-9\s.,;:!?\-]+$/; // Persian characters and numbers Unicode range
  constructor(private control: NgControl) {}
  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = this.sanitizeInput(input.value);
    if (input.value !== cleanedValue) {
      input.value = cleanedValue;
      this.updateFormControl(cleanedValue);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const cleanedValue = this.sanitizeInput(input.value);
    input.value = cleanedValue;
    this.updateFormControl(cleanedValue);
  }
  private sanitizeInput(value: string): string {
    return value
      .split('')
      .filter((char) => this.persianNumbersRegex.test(char))
      .join('');
  }

  private updateFormControl(value: string): void {
    this.control.control?.setValue(value);
    this.control.control?.markAsTouched();
    this.control.control?.updateValueAndValidity();
  }
}
