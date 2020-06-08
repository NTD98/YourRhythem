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
    this.api.getPlaylist().subscribe(val=>{
      console.log(val.items);
      this.playlists = val.items;
      //console.log(Object.getOwnPropertyNames)
      //this.getRecentTrack(this.playlists);
    });
    this.api.getInfor().subscribe(val=>{
      console.log(val);
      this.user=val;
    })
    //get recent played track
    this.api.getCurrentTracks().subscribe(val=>{
      console.log(this.removeDuplicateTrack(val.items));
      //limit 4 items
      this.recentTrack = this.removeDuplicateTrack(val.items,4);
      for(let i=0;i<4;i++)
      {
        //get type of tracks
        var type:Array<String> = this.recentTrack[i].uri.split(':');
        console.log(type);
        if(type[1]=="album")
        {
          console.log("album")
          //get album info with id
          this.api.getAlbumInfo(type[2].toString()).subscribe(val=>{
            console.log("album info");
            this.recentTrack[i]=val;
            console.log(this.recentTrack[i]);
          })
        }
        else{
          if(type[1]=="playlist")
          {
            console.log("playlist")
            //get playlist info with id
            this.api.getPlaylistInfo(type[2].toString()).subscribe(val=>{
              console.log("playlist info");
              this.recentTrack[i]=val;
              console.log(this.recentTrack[i]);
            })
          }
        }
      }
    })
  }
  removeDuplicateTrack(tracks:any,limit:number=3)
  {
    let result:Array<any>=[{}];
    let count=0;
    let isdif=0;
    let lenght=Object.getOwnPropertyNames(tracks).length-1;
    //console.log(Object.values(result[0]).find)
    for(let i=0;i<lenght;i++)
    {
      if(Object.values(result[0]).length==0)
        {
          result[0]=tracks[0].context;
          console.log(result[0]);
          count+=1;
          continue;
        }
      for(let j=0;j<count&&count<limit;j++){
        if(result[j].href!=tracks[i].context.href)
        {
          if(isdif==count){
            result[count]=tracks[i].context;
            console.log("add")
            console.log(i, j, count)
            count+=1;
            isdif=0;
          }
          else
          {
            isdif+=1;
          }
        } 
      }
      console.log("dup"+i)
    }
    return result;
  }
  getRecentTrack(){
    return this.recentTrack;
  }
}
