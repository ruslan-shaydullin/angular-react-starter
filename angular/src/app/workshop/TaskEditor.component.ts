import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import { WorkshopStore } from './store.service';
import { OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { Task, PRIORITIES } from '../../workshop/shared/types';
import { blankTask } from '../../workshop/shared/create-task';
import { TASK_TEMPLATES, taskFromTemplate } from '../../workshop/shared/templates';
@Component({ selector: 'workshop-task-editor', templateUrl: './TaskEditor.component.html' })
export class TaskEditorComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(public s: WorkshopStore) {}

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  ngAfterViewInit(): void {
    this.titleInput.nativeElement.focus();
  }
  @Input() task?: Task;
  @Output() closed = new EventEmitter<void>();
  draft: any = {};
  priorities = PRIORITIES;
  templates = TASK_TEMPLATES;
  ngOnInit(): void {
    this.reset();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']?.previousValue?.id !== this.task?.id) this.reset();
  }
  reset(): void {
    this.draft = this.task ? { ...this.task } : blankTask(this.s.state);
  }
  useTemplate(id: string): void {
    this.draft = taskFromTemplate(this.s.state, id);
  }
  save(): void {
    const { title, description, projectId, assignee, dueDate, estimate, priority } = this.draft;
    const values = { title, description, projectId, assignee, dueDate, estimate, priority };
    if (
      this.s.dispatch(
        this.task ? 'task.edit' : 'task.create',
        this.task ? { id: this.task.id, values } : this.draft
      )
    )
      this.closed.emit();
  }
}
