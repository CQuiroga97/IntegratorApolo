import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmisionComponent } from './transmision.component';

describe('TransmisionComponent', () => {
  let component: TransmisionComponent;
  let fixture: ComponentFixture<TransmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
