import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddDialog } from './product-add-dialog';

describe('ProductAddDialog', () => {
  let component: ProductAddDialog;
  let fixture: ComponentFixture<ProductAddDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
