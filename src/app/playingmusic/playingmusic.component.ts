import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ISong } from '../_model/song';
@Component({
  selector: 'app-playingmusic',
  templateUrl: './playingmusic.component.html',
  styleUrls: ['./playingmusic.component.scss']
})
export class PlayingmusicComponent implements OnInit {

  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();

  @ViewChild('player', {static: true}) player: ElementRef;

  songs: ISong[] = [];

  audio = new Audio();
  isPlaying = false;
  activeSong:any;
  articles;

  durationTime: string;
  constructor(private apiService: ApiService) {
   }

  ngOnInit(): void {
    this.songs = this.getListOfSongs();
    console.log(this.apiService.getToken());
    this.player.nativeElement.src = this.songs[0];
    this.player.nativeElement.load();
    this.activeSong = this.songs[0];
    this.isPlaying = false;
  }
  getListOfSongs(): ISong[] {
    return [
      {
        id: 1,
        title: 'Evanescence-Bring Me To Life(with lyrics).mp3',
        path: './assets/Evanescence-Bring Me To Life(with lyrics).mp3'
      },
      {
        id: 2,
        title: 'Numb (Official Video) - Linkin Park.mp3',
        path: './assets/Numb (Official Video) - Linkin Park.mp3'
      },
      {
        id: 3,
        title: 'System Of A Down - Toxicity (Official Video).mp3',
        path: './assets/System Of A Down - Toxicity (Official Video).mp3'
      }
    ];
  }
  playSong(song): void {
    this.durationTime = undefined;
    this.audio.pause();

    this.player.nativeElement.src = song.path;
    this.player.nativeElement.load();
    this.player.nativeElement.play();
    this.activeSong = song;
    this.isPlaying = true;
  }

  onTimeUpdate() {

    // Set song duration time
    if (!this.durationTime) {
      this.setSongDuration();
    }

    // Emit converted audio currenttime in user friendly ex. 01:15
    const currentMinutes = this.generateMinutes(this.player.nativeElement.currentTime);
    const currentSeconds = this.generateSeconds(this.player.nativeElement.currentTime);
    this.currentTime$.next(this.generateTimeToDisplay(currentMinutes, currentSeconds));


    // Emit amount of song played percents
    const percents = this.generatePercentage(this.player.nativeElement.currentTime, this.player.nativeElement.duration);
    if (!isNaN(percents)) {
      this.currentProgress$.next(percents);
    }

  }
  // Calculate song duration and set it to user friendly format, ex. 01:15
  setSongDuration(): void {
    const durationInMinutes = this.generateMinutes(this.player.nativeElement.duration);
    const durationInSeconds = this.generateSeconds(this.player.nativeElement.duration);

    if (!isNaN(this.player.nativeElement.duration)) {
      this.durationTime = this.generateTimeToDisplay(durationInMinutes, durationInSeconds);
    }
  }

  // Generate minutes from audio time
  generateMinutes(currentTime: number): number {
    return Math.floor(currentTime / 60);
  }

  // Generate seconds from audio time
  generateSeconds(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime % 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  generateTimeToDisplay(currentMinutes, currentSeconds): string {
    return `${currentMinutes}:${currentSeconds}`;
  }

  // Generate percentage of current song
  generatePercentage(currentTime: number, duration: number): number {
    return Math.round((currentTime / duration) * 100);
  }

  onPause(): void {
    this.isPlaying = false;
    this.currentProgress$.next(0);
    this.currentTime$.next('0:00');
    this.durationTime = undefined;
  }

   // Play song that comes after active song
   playNextSong(): void {
    const nextSongIndex = this.songs.findIndex((song) => song.id === this.activeSong.id + 1);

    if (nextSongIndex === -1) {
      this.playSong(this.songs[0]);
    } else {
      this.playSong(this.songs[nextSongIndex]);
    }
  }

  // Play song that comes before active song
  playPreviousSong(): void {
    const prevSongIndex = this.songs.findIndex((song) => song.id === this.activeSong.id - 1);
    if (prevSongIndex === -1) {
      this.playSong(this.songs[this.songs.length - 1]);
    } else {
      this.playSong(this.songs[prevSongIndex]);
    }
  }

}
