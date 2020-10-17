import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  public transform(value: string): string {
    if (value.startsWith('00:')) {
      return value.replace('00:', '');
    }
    return value;
  }
}
