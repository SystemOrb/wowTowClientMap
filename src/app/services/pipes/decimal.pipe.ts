import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(numberValue: number): number {
    if (numberValue !== 0 && (numberValue > 0)) {
      const x = numberValue.toString().replace('.', '');
      return Number(x);
    } else {
      return 0;
    }
  }
}
