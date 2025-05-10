import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cronometro',
  imports: [ MatCardModule, MatButtonModule, MatIcon ],
  templateUrl: './cronometro.component.html',
  styleUrl: './cronometro.component.scss',
})
export class CronometroComponent {
  @Output() countdownFinished = new EventEmitter<void>();

  private tempoPartida: number = 600; //600 segundos = 10 minutos
  segundos: number = this.tempoPartida;
  cronometroRegressivo: any;
  tempoContando: boolean = false;
  tempoZerado: boolean = true;
  corFundoTempo: string = 'background-color: darkgray';

  constructor(){}

  iniciaContagemRegressiva(){
    this.cronometroRegressivo=setInterval(() => {
      this.segundos--;
      
      if(this.segundos === 0){
        this.corFundoTempo = 'background-color: red';
        this.tempoContando = false;
        this.tempoZerado = false;
        this.segundos = this.tempoPartida;
        clearInterval(this.cronometroRegressivo);
        this.countdownFinished.emit();
      }
    },1000);
  }

  toggleTimer(){
    if(this.tempoContando){
      this.corFundoTempo = 'background-color: darkgray';
      clearInterval(this.cronometroRegressivo);
      this.tempoZerado = false;
    }else{
      this.iniciaContagemRegressiva();
      this.corFundoTempo = 'background-color: darkblue';
      this.tempoZerado = false;
    }
    this.tempoContando=!this.tempoContando;
  }

  resetTimer(){
    clearInterval(this.cronometroRegressivo);
    this.segundos = this.tempoPartida;
    this.tempoContando = false;
    this.tempoZerado = true;
    this.corFundoTempo = 'background-color: darkgray';
  }

  formatTime(segundos: number): string {
    const minutos: number = Math.floor(segundos/60);
    const segundosRestantes: number = segundos%60;

    const minutosFormatados: string = this.padNumber(minutos);
    const segundosFormatados: string = this.padNumber(segundosRestantes);
    return `${minutosFormatados}:${segundosFormatados}`
  }

  private padNumber(numero: number):string {
    return numero<10 ? `0${numero}` : `${numero}`;
  }
}
