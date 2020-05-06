import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { PlayingmusicComponent } from './playingmusic/playingmusic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingpageComponent,
    PlayingmusicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
