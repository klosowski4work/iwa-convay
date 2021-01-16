import {NgModule} from '@angular/core';
import {ViewportComponent} from './viewport.component';
import {CommonModule} from '@angular/common';
import {VIEWPORT_DEFAULTS_TOKEN, viewportDefaultConfig} from './viewport.config';
import {DrawerService} from '../../services/drawer.service';


@NgModule({
  imports: [CommonModule],
  declarations: [ViewportComponent],
  exports: [ViewportComponent],
  providers: [
    DrawerService,
    {
      provide: VIEWPORT_DEFAULTS_TOKEN,
      useValue: viewportDefaultConfig
    }
  ]
})
export class ViewportModule {
}
