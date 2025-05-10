import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DataDialog {
  titulo: string;
  pergunta: string;
}

@Component({
  selector: 'app-dialog-excluir-partida',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-excluir-partida.component.html',
  styleUrl: './dialog-excluir-partida.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExcluirPartidaComponent {
  readonly dialogRef = inject(MatDialogRef<DialogExcluirPartidaComponent>); 
  readonly data = inject<DataDialog>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
