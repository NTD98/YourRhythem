import { Component, OnInit } from '@angular/core';
import {ApiService} from '../_services/api.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getRefreshToken().subscribe(val=>
      {
        this.api.setToken(val.access_token);
        console.log(val.access_token);
        this.api.getInfor().subscribe(val=>console.log(val));
      });
  }

}
