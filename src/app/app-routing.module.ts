import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoadingpageComponent} from'./loadingpage/loadingpage.component';
import {PlayingmusicComponent} from './playingmusic/playingmusic.component';
const routes: Routes = [
  {path:"",component:LoadingpageComponent},
  {path:"playingmusic", component:PlayingmusicComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
