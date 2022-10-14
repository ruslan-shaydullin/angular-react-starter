import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopStore } from './store.service';

@Component({ selector: 'workshop-team', templateUrl: './Team.component.html' })
export class TeamComponent {
  constructor(public s: WorkshopStore) {}

  draft = { name: '', role: '', capacity: 16 };
  initials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('');
  }
  add(): void {
    if (this.s.dispatch('member.add', this.draft))
      this.draft = { name: '', role: '', capacity: 16 };
  }
}
