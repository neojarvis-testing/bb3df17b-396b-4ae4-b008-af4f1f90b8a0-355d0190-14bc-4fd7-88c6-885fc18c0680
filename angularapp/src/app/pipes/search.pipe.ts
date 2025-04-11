import { Pipe, PipeTransform } from '@angular/core';
import { Review } from '../models/review.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(reviews: Review[], searchData:string):Review[] {
    reviews = reviews.filter(data => data.product.productName.includes(searchData));
    return reviews;
  }

}
