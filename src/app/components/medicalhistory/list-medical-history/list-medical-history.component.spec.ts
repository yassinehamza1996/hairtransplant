import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedicalHistoryComponent } from './list-medical-history.component';

describe('ListMedicalHistoryComponent', () => {
  let component: ListMedicalHistoryComponent;
  let fixture: ComponentFixture<ListMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedicalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
