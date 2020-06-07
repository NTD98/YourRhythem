import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../_services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token :string;
  refreshtoken:string;
  searchUrl: string;
  authen:boolean=false;
  private client_id = '8878190d7d784bab92244dd4c86a2cf6';
  private client_secret = 'c553a4bf482641c4b819be4a64eef2c7';
  constructor(private route: ActivatedRoute, private http: Http,
              private router:Router,
              private tokenser:ApiService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams['code']);
    if(this.route.snapshot.queryParams['code'])
    {
      this.token  = this.route.snapshot.queryParams['code'];
      this.getRefreshToken().subscribe(val=>
        {
          this.refreshtoken=val.access_token;
          this.tokenser.setToken(val.access_token);
          this.tokenser.setReToken(val.refresh_token);
          this.authen=true;
        });
        setTimeout(() => {
          this.router.navigate(['user']);
        },5000);
    }
  }

  login() {
    let rights = 'playlist-read-private';
    window.location.href = 'https://accounts.spotify.com/authorize?client_id=' + this.client_id + '&response_type=code&redirect_uri=http://localhost:4200/login&scope='+rights+'&state=123&show_dialog=true';
  }
  searchMusic(str: string, type = "artist", token: string) {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getRefreshToken(){
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', this.token);
    params.append('redirect_uri','http://localhost:4200/login')
    let encoded = btoa(this.client_id + ':' + this.client_secret);
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let uurl = 'https://accounts.spotify.com/api/token';
    return this.http.post(proxy + uurl, params.toString() , {headers : headers})
        .pipe(
          map(res=> {
            let data = res.json()
            console.log(data)
             return data;
        })
      );  
  } 
  infor()
  {
    this.searchUrl = 'https://api.spotify.com/v1/me';
    let headers = new Headers();
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    headers.append('Authorization', 'Bearer ' + this.refreshtoken);
    return this.http.get(this.searchUrl, { headers: headers })
      .pipe(
        map((res: Response) => res.json())
      )
  }
  getInfor() {
    this.infor().subscribe(val=>console.log(val));
  }
  isAuthen() {
    return this.authen;
  }
}
