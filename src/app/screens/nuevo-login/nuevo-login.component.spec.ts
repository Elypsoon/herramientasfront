import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoLoginComponent } from './nuevo-login.component';

describe('NuevoLoginComponent', () => {
  let component: NuevoLoginComponent;
  let fixture: ComponentFixture<NuevoLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoLoginComponent]
    });
    fixture = TestBed.createComponent(NuevoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
