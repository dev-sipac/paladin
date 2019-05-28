import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesNuevoComponent } from './paises-nuevo.component';

describe('PaisesNuevoComponent', () => {
  let component: PaisesNuevoComponent;
  let fixture: ComponentFixture<PaisesNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisesNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisesNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
