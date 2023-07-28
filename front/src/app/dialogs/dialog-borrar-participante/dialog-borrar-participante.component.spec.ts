import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarParticipanteComponent } from './dialog-borrar-participante.component';

describe('DialogBorrarParticipanteComponent', () => {
  let component: DialogBorrarParticipanteComponent;
  let fixture: ComponentFixture<DialogBorrarParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBorrarParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBorrarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
