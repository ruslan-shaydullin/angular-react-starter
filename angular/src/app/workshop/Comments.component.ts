import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';
import { Task } from '../../workshop/shared/types';
import { memberName } from '../../workshop/shared/members';
@Component({ selector: 'workshop-comments', templateUrl: './Comments.component.html' })
export class CommentsComponent {
  constructor(public s: WorkshopStore) {}
  @Input() task!: Task;
  text = '';
  author = this.s.state.members[0]?.id || '';
  memberName = memberName;
  add(): void {
    if (this.s.dispatch('comment.add', { id: this.task.id, text: this.text, author: this.author }))
      this.text = '';
  }
}
