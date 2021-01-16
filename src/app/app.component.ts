import {Component, OnInit} from '@angular/core';
import {Point} from './utils/point';
import {ViewportApi, ViewportConfig} from './components/viewport/viewport.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  viewportConfig: ViewportConfig;

  ngOnInit(): void {
    this.viewportConfig = {
      onViewportReady: (viewportApi: ViewportApi) => {
        console.log('onViewportReady', viewportApi);
      },
      onFrameRender: (api: ViewportApi) => this.renderCells(api)
    };
  }

  renderCells(api: ViewportApi): void {
    api.clearViewport();
    api.fillCell(new Point(5, 5));
  }

  cellClicked(event: Point): void {
    console.log(event);
  }


}
