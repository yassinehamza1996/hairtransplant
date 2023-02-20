import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonalInformationComponent } from './list-personal-information.component';

describe('ListPersonalInformationComponent', () => {
  let component: ListPersonalInformationComponent;
  let fixture: ComponentFixture<ListPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
