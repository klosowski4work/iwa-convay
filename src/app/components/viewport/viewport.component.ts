import {AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Point} from '../../utils/point';
import {DrawerService} from '../../services/drawer.service';
import {ViewportApi, ViewportConfig} from './viewport.interfaces';
import {VIEWPORT_DEFAULTS_TOKEN} from './viewport.config';
import {defaults} from 'lodash';

@Component({
  selector: 'iwa-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit, AfterViewInit, ViewportConfig {
  @Input() config: ViewportConfig;
  @Output() cellClicked = new EventEmitter<Point>();
  private api: ViewportApi;
  private position = new Point();
  private offset = new Point();
  private dragPosition: Point = null;
  width: number;
  height: number;
  unitSize: number;

  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;


  constructor(
    private readonly drawerService: DrawerService,
    @Inject(VIEWPORT_DEFAULTS_TOKEN)
    readonly viewportConfigDefaults: ViewportConfig
  ) {
    this.config = defaults(this.config, viewportConfigDefaults);
    this.width = this.config.width;
    this.height = this.config.height;
    this.unitSize = this.config.unitSize;
  }

  ngOnInit(): void {
    this.api = {
      clearViewport: this.clear,
      fillCell: this.fillCell,
      changeDimensions: this.changeDimensions
    };
  }

  fillCell = (pos: Point) => {
    const x = (pos.x * this.unitSize + this.position.x + this.offset.x);
    const y = (pos.y * this.unitSize + this.position.y + this.offset.y);
    this.drawerService.drawCell(x, y, this.unitSize);
  };

  changeDimensions = (width: number, height: number) => {
    this.width = width;
    this.height = height;
  };

  clear = () => {
    this.drawerService.clear(this.width, this.height);
    const x = (this.position.x + this.offset.x);
    const y = (this.position.y + this.offset.y);
    this.drawerService.drawChequeredPattern(x % 20, y % 20, 20, this.width, this.height);
  };

  mouseMove({offsetX, offsetY}): void {
    if (!this.dragPosition) {
      return;
    }
    this.offset.x = offsetX - this.dragPosition.x;
    this.offset.y = offsetY - this.dragPosition.y;
  }

  setNewPosition({offsetX, offsetY}): void {
    const offset = new Point(offsetX - this.dragPosition.x, offsetY - this.dragPosition.y);
    this.position.x += offset.x;
    this.position.y += offset.y;
    this.dragPosition = null;
    this.offset = new Point();
    if (offset.x < this.unitSize && offset.y < this.unitSize) {
      const x = Math.floor((offsetX - this.position.x) / this.unitSize);
      const y = Math.floor((offsetY - this.position.y) / this.unitSize);
      this.cellClicked.emit(new Point(x, y));
    }
  }

  initDragPosition({offsetX, offsetY}): void {
    this.dragPosition = new Point(offsetX, offsetY);
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = this.width;
    this.canvas.nativeElement.height = this.height;

    this.drawerService.setContext(this.context);
    const {x, y} = this.position;
    this.drawerService.drawChequeredPattern(x, y, 20, this.width, this.height);

    this.initRenderer();
  }

  initRenderer(): void {
    setInterval(() => this.render(), 1);
  }


  render(): void {
    this.config.onFrameRender(this.api);
  }


}
