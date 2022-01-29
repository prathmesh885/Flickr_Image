import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.css']
})
export class SearchImagesComponent implements OnInit {
  images = [];
  keyword: string;
  nowImage = {title:"",url:""}
  i=0;
  constructor(private flickrService: FlickrService) { }

  ngOnInit() {
  }
  check=12;
  rating:number;
  providedBy=""
  reason=""
  code:boolean=true;
  img:boolean=false;
  back(){
    this.code=true;
    this.img=false;
    for(this.i=0;this.i<this.images.length;this.i++){
      console.log(this.i);
      if(this.nowImage.title==this.images[this.i].title){
        this.images[this.i]={url:this.nowImage.url,title:this.nowImage.title,rating:"Rating : "+this.rating,providedBy:"Provided By : "+this.providedBy,reason:"Reason : "+this.reason}
        break;
      }
    }
  }
  fun(img){
    this.nowImage = img;
    console.log(this.nowImage);
    this.img=true;
    this.code=false;
    
  }
  search(event: any) {
    this.keyword = event.target.value.toLowerCase();
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then(res => {
        this.images = res;
      });
    }
    console.log(this.images);
    
  }

  onScroll() {
    if (this.keyword && this.keyword.length > 0) {
      this.flickrService.search_keyword(this.keyword)
      .toPromise()
      .then(res => {
        this.images = this.images.concat(res);
      });
    }
  }

}
