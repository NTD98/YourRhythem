import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private api: ApiService) { }

  albums:any;
  artists:any;
  playlists:any;
  searchString:string;
  ngOnInit(): void {
    
  }
  onEnter(value: string){
    this.api.search(value,"album").subscribe(val=>{
      this.albums=val.albums.items;
      console.log("album",this.albums)
    })
    this.api.search(value,"artist").subscribe(val=>{
      this.artists = val.artists.items;
      console.log("artist",this.artists)
    })
    this.api.search(value,"playlist").subscribe(val=>{
      this.playlists = val.playlists.items;
      console.log("playlist",this.playlists)
    })
  }
}
