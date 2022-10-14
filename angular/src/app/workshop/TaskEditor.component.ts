import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { OnChanges, OnInit } from '@angular/core';
import { Task, PRIORITIES } from '../../workshop/shared/types';
import { blankTask } from '../../workshop/shared/create-task';
import { TASK_TEMPLATES, taskFromTemplate } from '../../workshop/shared/templates';
@Component({ selector: 'workshop-task-editor', templateUrl: './TaskEditor.component.html' })
export class TaskEditorComponent {
  constructor(public s: WorkshopStore) {}

  @Input() task?: Task;
  @Output() closed = new EventEmitter<void>();
  draft: any = {};
  priorities = PRIORITIES;
  templates = TASK_TEMPLATES;
  ngOnInit(): void {
    this.reset();
  }
  ngOnChanges(): void {
    this.reset();
  }
  reset(): void {
    this.draft = this.task ? { ...this.task } : blankTask(this.s.state);
  }
  useTemplate(id: string): void {
    this.draft = taskFromTemplate(this.s.state, id);
  }
  save(): void {
    if (
      this.s.dispatch(
        this.task ? 'task.edit' : 'task.create',
        this.task ? { id: this.task.id, values: this.draft } : this.draft
      )
    )
      this.closed.emit();
  }
}
