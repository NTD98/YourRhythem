import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private api: ApiService) { }
  playlists: any;
  user: any;
  recentTrack:any;
  recomendedTrack: any;

  ngOnInit(): void {
    console.log(this.api.getToken());

    //get recent played track
    this.api.getCurrentTracks().subscribe(val => {
      //console.log(this.removeDuplicateTrack(val.items,4));
      //limit 4 items
      console.log(val.items[0])
      this.recentTrack = this.removeDuplicateTrack(val.items, 3);
      for (let i = 0; i < 2; i++) {
        //get type of tracks
        var type: Array<String> = this.recentTrack[i].uri.split(':');
        console.log(type);
        if (type[1] == "album") {
          console.log("album")
          //get album info with id
          this.api.getAlbumInfo(type[2].toString()).subscribe(val => {
            console.log("album info");
            this.recentTrack[i] = val;
            console.log("album",this.recentTrack[i]);
          })
        }
        else {
          if (type[1] == "playlist") {
            console.log("playlist")
            //get playlist info with id
            this.api.getPlaylistInfo(type[2].toString()).subscribe(val => {
              console.log("playlist info");
              this.recentTrack[i] = val;
              console.log(this.recentTrack[i]);
            })
          }
        }
      }
      //get info to display recomnended track
      var artist = "";
      var trackid = this.recomendedTrack[0].track.id + "%2C";;
      for (let i = 0; i < Object.getOwnPropertyNames(this.recentTrack).length - 1; i++) {
        console.log("start")

        artist += this.recomendedTrack[i].track.artists[0].id + "%2C";
      }
      this.api.getRecomnendTracks(artist, trackid).subscribe(val => {
        for (let i = 0; i < 5; i++) {
          this.api.getAlbumInfo(val.tracks[i].album.id).subscribe(data => {
            this.recomendedTrack[i] = data;
            console.log("recom", this.recomendedTrack)
          })
        }
      })
    }
    )
  }
  displayTrack(num: number) {
    for (let i = 0; i < 2; i++) {
      //get type of tracks
      var type: Array<String> = this.recentTrack[i].uri.split(':');
      console.log(type);
      if (type[1] == "album") {
        console.log("album")
        //get album info with id
        this.api.getAlbumInfo(type[2].toString()).subscribe(val => {
          console.log("album info");
          this.recentTrack[i] = val;
          console.log(this.recentTrack[i]);
        })
      }
      else {
        if (type[1] == "playlist") {
          console.log("playlist")
          //get playlist info with id
          this.api.getPlaylistInfo(type[2].toString()).subscribe(val => {
            console.log("playlist info");
            this.recentTrack[i] = val;
            console.log(this.recentTrack[i]);
          })
        }
      }
    }
  }
  removeDuplicateTrack(tracks: any, limit: number = 3) {
    let result: Array<any> = [{}];
    let temremcom:Array<any> = [{}];
    let count = 0;
    let isdif = 0;
    let lenght = Object.getOwnPropertyNames(tracks).length - 1;
    //console.log(Object.values(result[0]).find)
    for (let i = 0; i < lenght; i++) {
      if (Object.values(result[0]).length == 0) {
        result[0] = tracks[0].context;
        temremcom[0] = tracks[0];
        console.log(result[0]);
        count += 1;
        continue;
      }
      for (let j = 0; j < count && count < limit; j++) {
        if (result[j].href != tracks[i].context.href) {
          isdif += 1;
          if (j == count - 1 && isdif == count) {
            result[count] = tracks[i].context;
            temremcom[count] = tracks[i];
            console.log("add")
            console.log(result[j].href, tracks[i].context.href, count)
            count += 1;
          }
        }
      }

    }
    this.recomendedTrack=temremcom;
    console.log(result)
    return result;
  }
  getRecentTrack() {
    return this.recentTrack;
  }

}
