import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  [x: string]: any;

}


@Injectable({
  providedIn: 'root'
})

export class ServiceSearchService {

 prevKeyword!: string;
 currPage = 1;


  constructor(private http: HttpClient) { }

   search_keyword(keyword : string){
    if (this.prevKeyword === keyword) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevKeyword = keyword;

    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=15&page=${this.currPage}`;

   return this.http.get(url + params).pipe (map((res: FlickrOutput) => { 
     const Arrs: any[] = [];
    res.photos.photo.forEach((ph: FlickrPhoto) => {
      const photoObj = {
        url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
        title: ph.title
      };
      Arrs.push(photoObj);
    });
    return Arrs;
  }));
}
}