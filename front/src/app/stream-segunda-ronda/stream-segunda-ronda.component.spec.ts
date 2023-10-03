import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamSegundaRondaComponent } from './stream-segunda-ronda.component';

describe('StreamSegundaRondaComponent', () => {
  let component: StreamSegundaRondaComponent;
  let fixture: ComponentFixture<StreamSegundaRondaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamSegundaRondaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamSegundaRondaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
