import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabezeraComponent } from './cabezera.component';

describe('CabezeraComponent', () => {
  let component: CabezeraComponent;
  let fixture: ComponentFixture<CabezeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabezeraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabezeraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
