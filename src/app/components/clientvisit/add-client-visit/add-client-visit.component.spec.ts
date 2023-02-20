import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientVisitComponent } from './add-client-visit.component';

describe('AddClientVisitComponent', () => {
  let component: AddClientVisitComponent;
  let fixture: ComponentFixture<AddClientVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
