import {Injectable} from '@angular/core';
import {DrawerCtxError} from '../errors/drawer-errors';
import {Point} from '../utils/point';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private context: CanvasRenderingContext2D;

  constructor() {
  }

  setContext(ctx: CanvasRenderingContext2D): void {
    this.context = ctx;
    this.context.lineWidth = 1;

    this.context.translate(0.5, 0.5);
  }

  drawVerticalLine(posX: number, length: number): void {
    this.contextAssertion();
    this.context.beginPath();
    this.context.moveTo(posX, 0);
    this.context.lineTo(posX, length);
    this.context.stroke();
  }

  drawHorizontalLine(posY: number, length: number): void {
    this.contextAssertion();
    this.context.beginPath();
    this.context.moveTo(0, posY);
    this.context.lineTo(length, posY);
    this.context.stroke();
  }

  drawChequeredPattern(posX: number, posY: number, rectSize: number, width: number, height: number): void {
    this.contextAssertion();
    const verticalLines = Math.ceil(width / rectSize);
    const horizontalLines = Math.ceil(height / rectSize);

    for (let x = 0; x <= verticalLines; x++) {
      this.drawVerticalLine(posX + x * rectSize, height);
    }
    for (let y = 0; y <= horizontalLines; y++) {
      this.drawHorizontalLine(posY + y * rectSize, width);
    }
  }

  clear(width: number, height: number): void {
    this.contextAssertion();
    this.context.clearRect(0, 0, width, height);
  }

  contextAssertion(): void {
    if (!this.context) {
      throw new DrawerCtxError();
    }
  }
}
