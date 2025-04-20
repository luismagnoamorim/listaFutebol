import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizadorPartidaComponent } from './organizador-partida.component';

describe('OrganizadorPartidaComponent', () => {
  let component: OrganizadorPartidaComponent;
  let fixture: ComponentFixture<OrganizadorPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizadorPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizadorPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
