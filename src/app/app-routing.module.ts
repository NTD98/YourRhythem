import { NgModule } from '@angular/core';
import { Routes, RouterModule ,PreloadAllModules} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {LoadingpageComponent} from'./loadingpage/loadingpage.component';
import {PlayingmusicComponent} from './playingmusic/playingmusic.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {HomeComponent} from './home/home.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path:"",component:LoadingpageComponent},
  {path:"playingmusic", component:PlayingmusicComponent},
  {path:"login", component:LoginComponent },
  {path:"user", component:UserinfoComponent },
  {path:"home", loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    { 
      preloadingStrategy: PreloadAllModules 
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
