import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { from } from 'rxjs/observable/from';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { map, tap, merge, catchError, pluck, combineLatest, filter } from 'rxjs/operators';

declare var createjs;

interface Image {
  scaleX: number;
  scaleY: number;
}

@Component({
  selector: 'app-customize-photo',
  templateUrl: './customize-photo.component.html',
  styleUrls: ['./customize-photo.component.css']
})

export class CustomizePhotoComponent implements OnInit {
  @ViewChild('file') file;
  @ViewChild('less') less: ElementRef;
  @ViewChild('more') more: ElementRef;
  @ViewChild('range') range: ElementRef;
  stage; any;

  constructor() { }

  ngOnInit() {}

  process(file) {
    this.createCanvas();
    if (file.files[0].type === 'image/jpeg') {
      this.makeRender(file.files[0]);
    }else {
      alert('No es un archivo valido');
    }
  }

  createCanvas() {
    this.stage = new createjs.Stage('canvas');
    this.stage.canvas.width = this.stage.canvas.height = 400;
    createjs.Ticker.addEventListener('tick', this.tick);
  }

  makeRender(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (info: any) => this.flow(info.target.result);
/*     reader.onerror = (info: any) => console.log(info);
    reader.onloadstart = (info: any) => console.log(info); */
  }

  flow = (data) => {
    this.getInput$(this.more)
    .pipe(
      merge(
        this.getInput$(this.less),
        fromEvent(this.range.nativeElement, 'input').pipe(pluck('target', 'value')),
      )
    )
    .pipe(
      combineLatest(this.loadImg$(data, this.stage), (s1, s2: Image) => ({'type': s1, 'img': s2})),
      filter(this.filterScale),
      tap(info => this.changeRange(info, this.range.nativeElement))
    )
    .subscribe(this.changeScale);
  }

  loadImg$(data, stage): Observable<any> {
    const bitmap = new createjs.Bitmap(data).set({x: 0, y: 0});
    stage.addChild(bitmap);

    return Observable.create(observable => {
      setTimeout(() => {
        bitmap.set({regX: bitmap.getBounds().width / 2, regY: bitmap.getBounds().height / 2});
        observable.next(bitmap);
      }, 100);
    });
  }

  getInput$(name: ElementRef): Observable<any> {
    return fromEvent(name.nativeElement, 'click').pipe(pluck('target', 'name'));
  }

  changeRange(info, range) {
    if (info.type === 'less') {
      range.value -= 0.1;
    }else if (info.type === 'more') {
      range.value = Number(range.value) + 0.1;
    }
  }

  filterScale(info: any): boolean {
    switch ( true ) {
      case info.type === 'less' && (info.img.scaleX - 0.1) > 0.09: return true;
      case info.type === 'more' && (info.img.scaleX + 0.1) < 2.1: return true;
      case isNaN(info.type) === false : return true;
      default: return false;
    }
  }

  changeScale(info: {type: string, img: Image}) {
    if ( info.type === 'less' || info.type === 'more' ) {
      info.img.scaleX = info.img.scaleY += (info.type === 'less') ? (-0.1) : ( 0.1);
    } else {
      info.img.scaleX = info.img.scaleY = Number(info.type);
    }
  }

  tick = () => {
    this.stage.update();
  }
}
