import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarUniversidadComponent } from './dialog-borrar-universidad.component';

describe('DialogBorrarUniversidadComponent', () => {
  let component: DialogBorrarUniversidadComponent;
  let fixture: ComponentFixture<DialogBorrarUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBorrarUniversidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBorrarUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
