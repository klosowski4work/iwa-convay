import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Point} from '../../utils/point';
import {DrawerService} from '../../services/drawer.service';

@Component({
  selector: 'iwa-viewport',
  templateUrl: './viewport.component.html',
  styleUrls: ['./viewport.component.css']
})
export class ViewportComponent implements OnInit, AfterViewInit {
  @Input() width = 320;
  @Input() height = 280;
  patternSize = 20;
  position = new Point();
  offset = new Point();
  dragPosition: Point = null;

  @ViewChild('canvasElement') canvas: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D;


  constructor(
    private readonly drawerService: DrawerService,
  ) {


  }

  ngOnInit(): void {
    // this.canvas.webkitImageSmoothingEnabled = false;
    // this.canvas.mozImageSmoothingEnabled = false;
    // this.canvas.imageSmoothingEnabled = false;
  }

  mouseMove({offsetX, offsetY}): void {
    if (!this.dragPosition) {
      return;
    }
    this.offset.x = offsetX - this.dragPosition.x;
    this.offset.y = offsetY - this.dragPosition.y;
    console.log(this.offset);
  }

  setNewPosition({offsetX, offsetY}): void {
    this.position.x += offsetX - this.dragPosition.x;
    this.position.y += offsetY - this.dragPosition.y;
    this.dragPosition = null;
    this.offset = new Point();
    console.log(this.position);
  }

  initDragPosition({offsetX, offsetY}): void {
    this.dragPosition = new Point(offsetX, offsetY);
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.drawerService.setContext(this.context);
    const {x, y} = this.position;
    this.drawerService.drawChequeredPattern(x, y, 20, this.width, this.height);

    this.initRenderer();
  }

  initRenderer(): void {
    setInterval(() => this.render(), 1);
  }

  render(): void {
    this.drawerService.clear(this.width, this.height);
    const x = (this.position.x + this.offset.x) % 20;
    const y = (this.position.y + this.offset.y) % 20;
    this.drawerService.drawChequeredPattern(x, y, 20, this.width, this.height);
  }


}
