import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogParticipanteComponent } from './dialog-participante.component';

describe('DialogParticipanteComponent', () => {
  let component: DialogParticipanteComponent;
  let fixture: ComponentFixture<DialogParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
