import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUniComponent } from './registro-uni.component';

describe('RegistroUniComponent', () => {
  let component: RegistroUniComponent;
  let fixture: ComponentFixture<RegistroUniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
