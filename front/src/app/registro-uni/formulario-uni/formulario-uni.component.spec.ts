import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUniComponent } from './formulario-uni.component';

describe('FormularioUniComponent', () => {
  let component: FormularioUniComponent;
  let fixture: ComponentFixture<FormularioUniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioUniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
