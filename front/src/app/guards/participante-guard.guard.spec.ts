import { TestBed } from '@angular/core/testing';

import { ParticipanteGuardGuard } from './participante-guard.guard';

describe('ParticipanteGuardGuard', () => {
  let guard: ParticipanteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ParticipanteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
