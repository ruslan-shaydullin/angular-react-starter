import { TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
describe('Workshop shell', () => {
  it('exposes a main landmark', () => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('main').id).toBe('main');
  });
});
