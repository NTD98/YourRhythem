import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    access_token : string;
    constructor(private httpClient: HttpClient) { }
    setToken(token:string){
      this.access_token=token;
    }
    getToken(){
      return this.access_token;
    }
}