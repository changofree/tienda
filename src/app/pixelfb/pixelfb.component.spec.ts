import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelfbComponent } from './pixelfb.component';

describe('PixelfbComponent', () => {
  let component: PixelfbComponent;
  let fixture: ComponentFixture<PixelfbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelfbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelfbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
