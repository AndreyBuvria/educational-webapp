import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Subscription } from 'rxjs';

export function checkPasswordMatch(parent_control: AbstractControl): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const subscription: Subscription = parent_control.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });

      return parent_control.value !== control.value ? {'compare': true } : null;
    }
}
