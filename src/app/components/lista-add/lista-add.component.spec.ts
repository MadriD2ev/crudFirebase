import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAddComponent } from './lista-add.component';

describe('ListaAddComponent', () => {
  let component: ListaAddComponent;
  let fixture: ComponentFixture<ListaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
