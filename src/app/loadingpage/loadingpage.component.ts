import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<String>;
  public currentUser: Observable<String>;
  private searchUrl: string;
  private redirect_uri:string;
  private client_id ='8878190d7d784bab92244dd4c86a2cf6';
  private client_secret = 'c553a4bf482641c4b819be4a64eef2c7';
  private access_token:string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  constructor(private router:Router,private http: Http) { 
    //this.login().subscribe(val=>console.log(val));
    (this.getToken().subscribe(val=>
      {
        this.access_token = val.access_token;
        localStorage.setItem('currentUser', val.access_token);
        //this.currentUserSubject.subscribe(ac=>ac = val.access_token);
        this.getInfor(val.access_token).subscribe(val=>console.log(val));
        (this.searchMusic("A","artist",val.access_token).subscribe(val=>console.log(val)));
    }));
    //console.log(this.access_token);
    setTimeout(() => 
    {
        //window.location.href = 'https://example.com/callback';
        this.router.navigate(['playingmusic']);
        this.currentUserSubject = new BehaviorSubject<String>(JSON.stringify(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        console.log(this.currentUserSubject.value);
    },
    7500);
  }
  public returnToken(){
    return this.currentUserSubject.value;
  }
  getInfor(token : string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.searchUrl = 'https://api.spotify.com/v1/me';
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getToken(){
    let params = ('grant_type=client_credentials');
    let encoded = btoa(this.client_id + ':' + this.client_secret);
    let headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let uurl = 'https://accounts.spotify.com/api/token';
    return this.http.post(proxy + uurl, params , {headers : headers})
        .pipe(
          map(res=> {
            let data = res.json()
            console.log(data)
             return data;
        })
      );
    
  } 
  searchMusic(str: string, type = "artist", token: string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + token);
    return this.http.get(this.searchUrl, {headers: headers})
    .pipe(
      map((res: Response) => res.json())
    )
  }
  ngOnInit(): void {
  }

}
