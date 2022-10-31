import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';
import { WorkshopStore } from './store.service';
export async function setup(hash = '#/tasks') {
  localStorage.clear();
  window.history.replaceState(null, '', hash);
  await TestBed.configureTestingModule({ imports: [AppModule] }).compileComponents();
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return {
    fixture,
    store: TestBed.inject(WorkshopStore),
    element: fixture.nativeElement as HTMLElement
  };
}
export async function settle(fixture: ComponentFixture<AppComponent>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
export function button(element: HTMLElement, name: string): HTMLButtonElement {
  const found = Array.from(element.querySelectorAll('button')).find(
    (item) => item.textContent?.trim() === name
  );
  if (!found) throw new Error('Button not found: ' + name);
  return found;
}
export function control(
  element: HTMLElement,
  label: string
): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
  const found = Array.from(element.querySelectorAll('label')).find(
    (item) =>
      Array.from(item.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join('')
        .trim() === label
  );
  const input = found?.querySelector('input,select,textarea');
  if (!input) throw new Error('Control not found: ' + label);
  return input as HTMLInputElement;
}
export function change(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  value: string
): void {
  input.value = value;
  input.dispatchEvent(
    new Event(input.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })
  );
}
