import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEliminatoriasComponent } from './panel-eliminatorias.component';

describe('PanelEliminatoriasComponent', () => {
  let component: PanelEliminatoriasComponent;
  let fixture: ComponentFixture<PanelEliminatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEliminatoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEliminatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
