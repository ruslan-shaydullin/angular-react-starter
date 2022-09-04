import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ShellComponent } from './workshop/Shell.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, ShellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
