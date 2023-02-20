import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHairlossComponent } from './add-hairloss.component';

describe('AddHairlossComponent', () => {
  let component: AddHairlossComponent;
  let fixture: ComponentFixture<AddHairlossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHairlossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHairlossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
