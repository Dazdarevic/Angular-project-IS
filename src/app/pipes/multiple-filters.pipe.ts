import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class MultipleFiltersPipe implements PipeTransform {

  transform(value: any[], filterString: string, propNames: any[]): any[] {
    if (!value || !filterString || !propNames) {
      return value;
    }

    const filterValue = filterString.toLowerCase();

    return value.filter(item => {
      for (const propName of propNames) {
        if (item[propName].toLowerCase().includes(filterValue)) {
          return true; // Ako se pronađe podudaranje u bilo kojem svojstvu, vraćamo true
        }
      }
      return false; // Ako nema podudaranja ni u jednom svojstvu, vraćamo false
    });
  }
}
