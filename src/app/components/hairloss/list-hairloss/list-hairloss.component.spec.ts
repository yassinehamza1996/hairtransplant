import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHairlossComponent } from './list-hairloss.component';

describe('ListHairlossComponent', () => {
  let component: ListHairlossComponent;
  let fixture: ComponentFixture<ListHairlossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHairlossComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHairlossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
