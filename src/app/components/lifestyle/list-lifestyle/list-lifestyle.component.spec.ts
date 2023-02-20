import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLifestyleComponent } from './list-lifestyle.component';

describe('ListLifestyleComponent', () => {
  let component: ListLifestyleComponent;
  let fixture: ComponentFixture<ListLifestyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLifestyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLifestyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
