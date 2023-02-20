import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonalInformationComponent } from './add-personal-information.component';

describe('AddPersonalInformationComponent', () => {
  let component: AddPersonalInformationComponent;
  let fixture: ComponentFixture<AddPersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPersonalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
