import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosCompetenciaComponent } from './resultados-competencia.component';

describe('ResultadosCompetenciaComponent', () => {
  let component: ResultadosCompetenciaComponent;
  let fixture: ComponentFixture<ResultadosCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosCompetenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
