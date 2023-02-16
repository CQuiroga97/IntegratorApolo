import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUniversidadesComponent } from './registro-universidades.component';

describe('RegistroUniversidadesComponent', () => {
  let component: RegistroUniversidadesComponent;
  let fixture: ComponentFixture<RegistroUniversidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUniversidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
