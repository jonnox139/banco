import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAuthorizeAccessComponent } from './pop-up-authorize-access.component';

describe('PopUpAuthorizeAccessComponent', () => {
  let component: PopUpAuthorizeAccessComponent;
  let fixture: ComponentFixture<PopUpAuthorizeAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpAuthorizeAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpAuthorizeAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
