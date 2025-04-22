import { Validators } from '@angular/forms';

export function requiredIfValidator(predicate: any) {
  return (formControl: any) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return Validators.required(formControl);
    }
    return null;
  };
}
