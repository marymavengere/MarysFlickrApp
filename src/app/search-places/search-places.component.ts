import { Component, OnInit } from '@angular/core';
import { ServiceSearchService } from '../search.service';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit {
  images : any[] = [];
  keyword!: string;


 
  constructor (private servicesearchservice: ServiceSearchService) { }

  ngOnInit(): void {
  }
  search(event: any){
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0 ){
       this.servicesearchservice.search_keyword(this.keyword)
       .toPromise()
       .then((res: any[]) => {
         this.images = res;
       });
    }
   }

}
