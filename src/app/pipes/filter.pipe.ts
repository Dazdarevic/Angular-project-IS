import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string, propName: any): any[] {
    if (!value || !filterString || !propName) {
      // Ako ne postoji niz 'value', vrednost za filtriranje 'filterString',
      //ili ime svojstva 'propName', vrati nepromenjen niz 'value'
      return value;
    }

    const filterValue = filterString.toLowerCase();

    return value.filter(item => item[propName].toLowerCase().includes(filterValue));
  }
}
