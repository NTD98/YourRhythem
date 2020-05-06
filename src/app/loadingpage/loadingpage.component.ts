import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.scss']
})
export class LoadingpageComponent implements OnInit {

  constructor(private router:Router) { 
    setTimeout(() => 
    {
        this.router.navigate(['playingmusic']);
        console.log("abvc");
    },
    3500);
  }

  ngOnInit(): void {
  }

}
