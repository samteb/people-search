import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(values: User[], searchTerm: string): any {
    return values.filter(value => value.username.includes(searchTerm) || value.email.includes(searchTerm));
  }
}
