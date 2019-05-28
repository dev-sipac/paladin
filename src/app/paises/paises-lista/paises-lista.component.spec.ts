import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesListaComponent } from './paises-lista.component';

describe('PaisesListaComponent', () => {
  let component: PaisesListaComponent;
  let fixture: ComponentFixture<PaisesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
