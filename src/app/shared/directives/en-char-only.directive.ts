import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[enCharOnly]',
  standalone: true,
})
export class EnCharOnlyDirective {
  constructor(private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^a-zA-Z0-9\s.,;:!?\-]/g, '');
    if (input.value !== cleanedValue) {
      input.value = cleanedValue;
      this.updateFormControl(cleanedValue);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData?.getData('text') || ''; // Access pasted data
    const cleanedValue = pastedData.replace(/[^a-zA-Z0-9\s.,;:!?\-]/g, '');
    const input = event.target as HTMLInputElement;
    input.value = cleanedValue;
    this.updateFormControl(cleanedValue);
  }

  private updateFormControl(value: string): void {
    this.control.control?.setValue(value);
    this.control.control?.markAsTouched();
    this.control.control?.updateValueAndValidity();
  }
}
