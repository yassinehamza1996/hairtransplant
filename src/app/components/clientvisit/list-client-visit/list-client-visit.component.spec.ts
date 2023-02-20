import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientVisitComponent } from './list-client-visit.component';

describe('ListClientVisitComponent', () => {
  let component: ListClientVisitComponent;
  let fixture: ComponentFixture<ListClientVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClientVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
