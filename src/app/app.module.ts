import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { PlayingmusicComponent } from './playingmusic/playingmusic.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoadingpageComponent,
    PlayingmusicComponent,
    LoginComponent,
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
