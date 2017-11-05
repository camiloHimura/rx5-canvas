import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

declare var createjs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {



  constructor() {
  }

  ngAfterViewInit() {
/*     this.loadCreadjs(document, 'script', 'createjs')
      .pipe(
        tap(info => console.log(info)),
        map(info => console.log(info))
      )
      .subscribe(info => console.log('create js cargado')); */
  }

/*   loadCreadjs(d, s, id): Observable<any> {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://code.createjs.com/easeljs-0.8.2.min.js';
      fjs.parentNode.insertBefore(js, fjs);

      return fromEvent(js , 'load');
  } */

}
