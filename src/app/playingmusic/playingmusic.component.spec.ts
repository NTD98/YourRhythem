import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingmusicComponent } from './playingmusic.component';

describe('PlayingmusicComponent', () => {
  let component: PlayingmusicComponent;
  let fixture: ComponentFixture<PlayingmusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayingmusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
