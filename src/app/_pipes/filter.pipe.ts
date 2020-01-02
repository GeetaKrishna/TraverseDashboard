import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    console.log(items, searchText)
    if (!items) return [];
    if (!searchText) {
      return items;
    }
    else {
      searchText = searchText.toLowerCase();
      return items.filter(it => {
        return it['name'].toLowerCase().includes(searchText);
      });
    }

  }

}
