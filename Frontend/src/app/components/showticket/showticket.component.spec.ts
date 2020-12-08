import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowticketComponent } from './showticket.component';

describe('ShowticketComponent', () => {
  let component: ShowticketComponent;
  let fixture: ComponentFixture<ShowticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
