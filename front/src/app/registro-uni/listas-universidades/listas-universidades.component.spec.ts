import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasUniversidadesComponent } from './listas-universidades.component';

describe('ListasUniversidadesComponent', () => {
  let component: ListasUniversidadesComponent;
  let fixture: ComponentFixture<ListasUniversidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListasUniversidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasUniversidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
