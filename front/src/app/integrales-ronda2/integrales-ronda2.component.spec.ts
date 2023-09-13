import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegralesRonda2Component } from './integrales-ronda2.component';

describe('IntegralesRonda2Component', () => {
  let component: IntegralesRonda2Component;
  let fixture: ComponentFixture<IntegralesRonda2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegralesRonda2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegralesRonda2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
