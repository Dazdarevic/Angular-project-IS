import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (!value) {
      return value; // Ako je vrednost undefined, vrati je kao takvu
    }

    const phoneNumber = value.replace(/\s/g, '');

    if (phoneNumber.length === 10) {
      // Formatiraj broj u format "XXX-XXX-XXXX"
      const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      return formattedNumber;
    }

    // Ako broj nije ispravnog formata, vrati originalnu vrednost
    return value;
  }

}
