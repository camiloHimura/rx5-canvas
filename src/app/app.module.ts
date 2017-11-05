import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomizePhotoComponent } from './customize-photo/customize-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomizePhotoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
