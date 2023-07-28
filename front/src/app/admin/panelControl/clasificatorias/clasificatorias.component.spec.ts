import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificatoriasComponent } from './clasificatorias.component';

describe('ClasificatoriasComponent', () => {
  let component: ClasificatoriasComponent;
  let fixture: ComponentFixture<ClasificatoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificatoriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
