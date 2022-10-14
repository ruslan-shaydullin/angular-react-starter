import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { boardColumns } from '../../workshop/shared/grouping';
import { adjacentStatus, boardLimitWarning } from '../../workshop/shared/board';
import { filterTasks } from '../../workshop/shared/filters';
@Component({ selector: 'workshop-board', templateUrl: './Board.component.html' })
export class BoardComponent {
  constructor(public s: WorkshopStore) {}
  adjacentStatus = adjacentStatus;
  boardLimitWarning = boardLimitWarning;
  get columns() {
    return boardColumns(
      filterTasks(this.s.state, this.s.filters).filter(
        (task) => this.s.state.preferences.showCompleted || task.status !== 'done'
      )
    );
  }
}
