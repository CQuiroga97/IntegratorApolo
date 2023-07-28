import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogModificarUniversidadComponent } from './dialog-modificar-universidad.component';

describe('DialogModificarUniversidadComponent', () => {
  let component: DialogModificarUniversidadComponent;
  let fixture: ComponentFixture<DialogModificarUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogModificarUniversidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogModificarUniversidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
