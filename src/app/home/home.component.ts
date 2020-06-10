import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { stringify } from 'querystring';
import { empty } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService) { }
  playlists:any;
  user:any;
  recentTrack:Object;
  ngOnInit(): void {
    console.log(this.api.getToken());
    this.api.getInfor().subscribe(val=>{
      console.log(val);
      this.user=val;
    })
    this.api.getPlaylist().subscribe(val=>{
      console.log(val.items);
      this.playlists = val.items;
      //console.log(Object.getOwnPropertyNames)
      //this.getRecentTrack(this.playlists);
    });
    //get recent played track
  }
}
