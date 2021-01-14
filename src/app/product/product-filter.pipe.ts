import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: Product[], filterText?: string): Product[] {
    filterText = filterText?filterText.toLocaleLowerCase():"";

    return filterText?value.filter((p:Product)=>p.name
    .toLocaleLowerCase().indexOf(filterText+"")!==-1):value;
    //filterText varsa listeyi filtrele , p.name e göre(p.name= her bir ürün için)
    //ürünün ismini küçük harfe çevir
    //içinde filterText varsa onları listeye ekle ,yani yeni bir liste oluşturuyor.
    
  }

}
