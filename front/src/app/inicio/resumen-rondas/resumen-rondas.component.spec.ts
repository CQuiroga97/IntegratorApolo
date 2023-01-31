import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenRondasComponent } from './resumen-rondas.component';

describe('ResumenRondasComponent', () => {
  let component: ResumenRondasComponent;
  let fixture: ComponentFixture<ResumenRondasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenRondasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenRondasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
