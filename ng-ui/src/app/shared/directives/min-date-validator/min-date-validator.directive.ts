import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import * as dayjs from 'dayjs';

export function minDateValueValidator(
  minValue: string,
): ValidatorFn {
  return (control: AbstractControl) => {
    if (control == null || control.value == null || control.value === '') {
      return null;
    }

    const v = dayjs(control.value);
    const min = dayjs(minValue);

    const isValid = v >= min;
    return isValid ? null : { venkoMinDateValue: { value: control.value } };
  };
}

@Directive({
  selector: '[venkoMinDateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: MinDateValidatorDirective,
      multi: true,
    },
  ],
})
export class MinDateValidatorDirective implements Validator {
  @Input()
  venkoMinDateValue: string;

  validate(control: AbstractControl): ValidationErrors {
    return minDateValueValidator(
      this.venkoMinDateValue,
    )(control);
  }
}
