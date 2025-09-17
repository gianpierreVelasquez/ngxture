import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxtureComponent } from './ngxture.component';

describe('NgxturesComponent', () => {
  let component: NgxtureComponent;
  let fixture: ComponentFixture<NgxtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxtureComponent]
    });
    fixture = TestBed.createComponent(NgxtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
