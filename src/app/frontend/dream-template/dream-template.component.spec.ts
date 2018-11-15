import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamTemplateComponent } from './dream-template.component';

describe('DreamTemplateComponent', () => {
  let component: DreamTemplateComponent;
  let fixture: ComponentFixture<DreamTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
