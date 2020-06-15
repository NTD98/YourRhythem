import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;
  searchUrl: string;
  access_token: string;
  refresh_token: string;
  private client_id = '8878190d7d784bab92244dd4c86a2cf6';
  private client_secret = 'c553a4bf482641c4b819be4a64eef2c7';
  constructor(private http: Http) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('currentToken'));
    this.currentToken = this.currentTokenSubject.asObservable();
    this.access_token = this.currentTokenSubject.value;
  }
  setToken(token: string) {
    localStorage.clear();
    localStorage.setItem('currentToken',token);
    this.access_token = token;
  }
  getToken() {
    return this.currentTokenSubject.value;
  }
  setReToken(token: string) {
    this.refresh_token = token;
  }
  getReToken() {
    return this.refresh_token;
  }
  getRefreshToken() {
    let params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', this.access_token);
    let encoded = btoa(this.client_id + ':' + this.client_secret);
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let uurl = 'https://accounts.spotify.com/api/token';
    return this.http.post(proxy + uurl, params.toString(), { headers: headers })
      .pipe(
        map(res => {
          let data = res.json()
          console.log(data)
          return data;
        })
      );
  }
  search(query:string,type:string){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/search?q='+query+"&type="+type+"&limit=5&offset=5";
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getPlaylist() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/me/playlists';
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getAlbumInfo(id:string){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/albums/'+id;
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getPlaylistInfo(id:string){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/playlists/'+id;
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getCurrentTracks(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/me/player/recently-played?type=track&limit=20&after=1489676792';
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getRecomnendTracks(artists:string,trackid:string){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    let genres = 'k-pop%2Cpop';
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    this.searchUrl = 'https://api.spotify.com/v1/recommendations?limit=5&market=ES&seed_artists='+artists+'&seed_genres='+genres+'&seed_tracks='+trackid;
    console.log(this.access_token);
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getInfor() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.access_token);
    this.searchUrl = 'https://api.spotify.com/v1/me';
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
}