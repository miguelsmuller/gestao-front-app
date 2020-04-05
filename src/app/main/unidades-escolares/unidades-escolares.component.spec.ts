import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesEscolaresComponent } from './unidades-escolares.component';

describe('UnidadesEscolaresComponent', () => {
  let component: UnidadesEscolaresComponent;
  let fixture: ComponentFixture<UnidadesEscolaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesEscolaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesEscolaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
