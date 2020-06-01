import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    API_KEY = '6127ff1ad55e46a9b9bf01c448b5df4e';
    public getNews(){
        return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`);
      }
    constructor(private httpClient: HttpClient) { }
}