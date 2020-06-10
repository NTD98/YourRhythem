
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {HomeComponent} from './home.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';


const routes: Routes = [

    {
      path:"",component:HomeComponent, children:[
      {
        path:"",component:MainComponent
      }
      ]
    }
  ];


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class HomeModule {
    public static routes = routes;
}
