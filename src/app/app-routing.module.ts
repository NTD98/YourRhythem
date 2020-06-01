import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LoadingpageComponent} from'./loadingpage/loadingpage.component';
import {PlayingmusicComponent} from './playingmusic/playingmusic.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path:"",component:LoadingpageComponent},
  {path:"playingmusic", component:PlayingmusicComponent},
  {path:"login", component:LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
