import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoventasComponent } from './listadoventas.component';

describe('ListadoventasComponent', () => {
  let component: ListadoventasComponent;
  let fixture: ComponentFixture<ListadoventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoventasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
