import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorkshopModule } from './workshop/workshop.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WorkshopModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
