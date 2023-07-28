import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginParticipanteComponent } from './login-participante.component';

describe('LoginParticipanteComponent', () => {
  let component: LoginParticipanteComponent;
  let fixture: ComponentFixture<LoginParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginParticipanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
