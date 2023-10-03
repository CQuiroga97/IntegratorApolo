import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaRondaComponent } from './segunda-ronda.component';

describe('SegundaRondaComponent', () => {
  let component: SegundaRondaComponent;
  let fixture: ComponentFixture<SegundaRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundaRondaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundaRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
