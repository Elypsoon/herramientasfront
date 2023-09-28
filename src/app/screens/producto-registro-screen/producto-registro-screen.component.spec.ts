import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRegistroScreenComponent } from './producto-registro-screen.component';

describe('ProductoRegistroScreenComponent', () => {
  let component: ProductoRegistroScreenComponent;
  let fixture: ComponentFixture<ProductoRegistroScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoRegistroScreenComponent]
    });
    fixture = TestBed.createComponent(ProductoRegistroScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
