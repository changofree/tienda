import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosProductosComponent } from './todos-productos.component';

describe('TodosProductosComponent', () => {
  let component: TodosProductosComponent;
  let fixture: ComponentFixture<TodosProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
