import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcluirPartidaComponent } from './dialog-excluir-partida.component';

describe('DialogExcluirPartidaComponent', () => {
  let component: DialogExcluirPartidaComponent;
  let fixture: ComponentFixture<DialogExcluirPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExcluirPartidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExcluirPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
