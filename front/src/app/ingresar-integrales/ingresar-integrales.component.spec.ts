import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarIntegralesComponent } from './ingresar-integrales.component';

describe('IngresarIntegralesComponent', () => {
  let component: IngresarIntegralesComponent;
  let fixture: ComponentFixture<IngresarIntegralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarIntegralesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarIntegralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
