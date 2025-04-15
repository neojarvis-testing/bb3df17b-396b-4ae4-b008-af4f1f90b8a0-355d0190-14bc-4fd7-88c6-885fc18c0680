import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestnavComponent } from './guestnav.component';

describe('GuestnavComponent', () => {
  let component: GuestnavComponent;
  let fixture: ComponentFixture<GuestnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
