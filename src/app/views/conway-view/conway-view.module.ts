import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConwayViewComponent} from './conway-view.component';
import {ViewportModule} from '../../components/viewport/viewport.module';



@NgModule({
  declarations: [
    ConwayViewComponent
  ],
  exports: [
    ConwayViewComponent
  ],
  imports: [
    CommonModule,
    ViewportModule,
  ]
})
export class ConwayViewModule { }
