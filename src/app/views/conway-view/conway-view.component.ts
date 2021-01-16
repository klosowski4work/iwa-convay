import {Component, OnInit} from '@angular/core';
import {ViewportApi, ViewportConfig} from '../../components/viewport/viewport.interfaces';
import {Point} from '../../utils/point';
import {get, set} from 'lodash';

@Component({
  selector: 'iwa-conway-view',
  templateUrl: './conway-view.component.html',
  styleUrls: ['./conway-view.component.css']
})
export class ConwayViewComponent implements OnInit {
  viewportConfig: ViewportConfig;
  viewportApi: ViewportApi;
  cells = {};
  runSimulation = false;

  ngOnInit(): void {
    this.prepareViewportConfig();
    setInterval(() => {
      if (this.runSimulation) {
        this.calculateNextState();
      }
    }, 100);
  }

  toggleSimulation(): void {
    this.runSimulation = !this.runSimulation;
  }

  private prepareViewportConfig(): void {
    this.viewportConfig = {
      unitSize: 10,
      onViewportReady: (viewportApi: ViewportApi) => {
        console.log('onViewportReady', viewportApi);
      },
      onFrameRender: (api: ViewportApi) => this.renderCells(api)
    };
  }

  renderCells(api: ViewportApi): void {
    api.clearViewport();
    Object.keys(this.cells).forEach(key => {
      Object.values(this.cells[key]).forEach((point: Point) => {
        api.fillCell(point);
      });
    });
  }

  cellClicked(event: Point): void {
    this.toggleCell(event.x, event.y);
  }

  toggleCell(x: number, y: number): void {
    const cell = get(this.cells, [x, y], false);
    if (cell) {
      delete this.cells[x][y];
    } else {
      set(this.cells, [x, y], new Point(x, y));
    }
  };

  calculateNextState(): void {
    const nextCellsState = {};
    Object.keys(this.cells).forEach(key => {
      Object.values(this.cells[key]).forEach((cell: Point) => {
        const {dead, living} = this.getCellNeighbors(cell);

        if (!this.shouldCellDie(living.length)) {
          set(nextCellsState, [cell.x, cell.y], cell);
        }

        const bornCells = this.bornCellsIfShould(dead);
        bornCells.forEach(bornCell => {
          set(nextCellsState, [bornCell.x, bornCell.y], bornCell);
        });
      });
    });
    this.cells = nextCellsState;
  }

  bornCellsIfShould(deadCells: Point[]): Point[] {
    return deadCells.filter(cell => this.shouldCellBorn(cell));
  }

  shouldCellDie(livingNeighborsCount: number): boolean {
    return !(livingNeighborsCount === 2 || livingNeighborsCount === 3);
  }

  shouldCellBorn(cell: Point): boolean {
    const {living} = this.getCellNeighbors(cell);
    return living.length === 3;
  }


  getCellNeighbors(cell: Point): { dead: Point[], living: Point[] } {
    const neighbors = {
      living: [],
      dead: [],
    };
    for (let x = cell.x - 1; x <= cell.x + 1; x++) {
      for (let y = cell.y - 1; y <= cell.y + 1; y++) {
        if (cell.x === x && cell.y === y) {
          continue;
        }
        if (get(this.cells, [x, y], false)) {
          neighbors.living.push(this.cells[x][y]);
        } else {
          neighbors.dead.push(new Point(x, y));
        }
      }
    }
    return neighbors;
  }
}
