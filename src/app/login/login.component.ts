import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  searchUrl:string;
  private client_id ='8878190d7d784bab92244dd4c86a2cf6';
  private client_secret = 'acac31590ceb4da38a123253a8c87cc9';
  constructor(private route:ActivatedRoute,private http: Http) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams['code']);
    if(this.route.snapshot.queryParams['code'])
    (this.searchMusic("A","artist",this.route.snapshot.queryParams['code']).subscribe(val=>console.log(val)));
  }

  login(){
    window.location.href='https://accounts.spotify.com/authorize?client_id='+this.client_id+'&response_type=code&redirect_uri=http://localhost:4200/login&scope=user-read-private%20user-read-email&state=34fFs29kd09&show_dialog=true';
    
  }
  searchMusic(str: string, type = "artist", token: string){
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    let headers = new Headers();
    headers.append('Authorization' , 'Bearer ' + 'token');
    return this.http.get(this.searchUrl, {headers: headers})
    .pipe(
      map((res: Response) => res.json())
    )
  }
}
