import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('Workshop shell',()=>{ it('gives the workspace a reachable main landmark',()=>{TestBed.configureTestingModule({declarations:[AppComponent]});const fixture=TestBed.createComponent(AppComponent);fixture.detectChanges();expect(fixture.nativeElement.querySelector('main').id).toBe('main');expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Release workshop');});});
