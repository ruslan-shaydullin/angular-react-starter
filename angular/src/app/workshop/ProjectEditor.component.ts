import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Project } from '../../workshop/shared/types';
@Component({ selector: 'workshop-project-editor', templateUrl: './ProjectEditor.component.html' })
export class ProjectEditorComponent {
  constructor(public s: WorkshopStore) {}

  @Input() project: Project | null = null;
  @Output() closed = new EventEmitter<void>();
  draft: any = { name: '', description: '', color: '#215b9a' };
  ngOnChanges(): void {
    this.draft = this.project
      ? { ...this.project }
      : { name: '', description: '', color: '#215b9a' };
  }
  save(): void {
    if (this.s.dispatch('project.save', { id: this.project?.id, values: this.draft }))
      this.closed.emit();
  }
}
