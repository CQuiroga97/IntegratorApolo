import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControlComponent } from './panel-control.component';

describe('PanelControlComponent', () => {
  let component: PanelControlComponent;
  let fixture: ComponentFixture<PanelControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
