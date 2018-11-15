import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomewebComponent } from './homeweb.component';

describe('HomewebComponent', () => {
  let component: HomewebComponent;
  let fixture: ComponentFixture<HomewebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomewebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomewebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
