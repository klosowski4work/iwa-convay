import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ViewportModule} from './components/viewport/viewport.module';
import {ConwayViewModule} from './views/conway-view/conway-view.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ViewportModule,
    ConwayViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
