import { Pipe, PipeTransform } from '@angular/core';
import { ifError } from 'assert';
import { Article } from '../article';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Article[], searchText: string): any[] {
    if(!items || !searchText)
    {
      return items ;
    }
    
    return items.filter(article =>
       article.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }

}
