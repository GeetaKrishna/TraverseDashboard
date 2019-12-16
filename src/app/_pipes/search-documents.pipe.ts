import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDocuments'
})
export class SearchDocumentsPipe implements PipeTransform {

  transform(value: any[], searchText: string): any {
    console.log(value, searchText);
    if (!value) return [];
    if (!searchText) {
      return value;
    }
    else {
      searchText = searchText.toLowerCase();
      return value.filter(it => {
        return it['fileName'].toLowerCase().includes(searchText);
      });
    }
  }

}
