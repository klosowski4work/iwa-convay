import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ViewportModule} from './components/viewport/viewport.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ViewportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
