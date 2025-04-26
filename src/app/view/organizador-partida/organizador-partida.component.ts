import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatListOption } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatGridListModule} from '@angular/material/grid-list';
import { CronometroComponent } from "../cronometro/cronometro.component";

export interface IEventoPartida {
  nomeJogador: string,
  nomeEvento: string
}

export interface IEstatisticaJogador {
  nomeJogador: string,
  quantidadeGol: number,
  quantidadeAssistencia: number,
  quantidadeVitoria: number
}

@Component({
  selector: 'app-organizador-partida',
  imports: [MatButtonModule, MatCardModule, MatIconModule,
    FormsModule, MatInputModule, MatFormFieldModule, MatListModule,
    MatGridListModule, CronometroComponent, MatTableModule],
  templateUrl: './organizador-partida.component.html',
  styleUrl: './organizador-partida.component.scss'
})

export class OrganizadorPartidaComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    //this.segundos = this.segundos;
  }
  title='Organizar Partida';
  
  naoPodeEmbaralhar: boolean = true;
  inputNomeJogador = '';
  listaEspera: string[] = [];

  listaPrimeiroTime: string[] = [];
  listaSegundoTime: string[] = [];
  timeFaltaEscalar: number = 1;

  placarPrimeiroTime: number = 0;
  placarSegundoTime: number = 0;
  listaEventosPartida: IEventoPartida[] = [];
  listaEstatisticaJogador: IEstatisticaJogador[] = [];
  desabilitaEventoPartida: boolean = true;

  colunasEstatisticaJogador: string[] = ['jogador', 'gol', 'assistencia', 'vitoria'];
  dataSource = new MatTableDataSource(this.listaEstatisticaJogador);

  incluirJogadorListaEspera(nomeJogador: string){
    this.listaEspera.push(nomeJogador);
    this.inputNomeJogador = '';
    this.naoPodeEmbaralhar = false;
  }

  excluirJogadorListaEspera(lista: MatListOption[]){
    for(let i=0; i < lista.length ; i++){
      let nomejogador: string;
      nomejogador = lista[i].getLabel()
      const index = this.listaEspera.indexOf(nomejogador);
      if(index > -1){
        this.listaEspera.splice(index, 1);
      }
    }
    if(this.listaEspera.length === 0){ 
      this.naoPodeEmbaralhar = true;
    }
  }

  embaralharListaEspera(){
    if(this.listaEspera.length > -1){
      let currentIndex = this.listaEspera.length;
      while (0 !== currentIndex) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Swap
        let temp = this.listaEspera[currentIndex];
        this.listaEspera[currentIndex] = this.listaEspera[randomIndex];
        this.listaEspera[randomIndex] = temp;
      }
    }
  }

  incluirTimePartida(time:number, lista: MatListOption[]){
    if(time === 1){
      for(let i=0; i < lista.length ; i++){
        let nomejogador: string;
        nomejogador = lista[i].getLabel()
        this.listaPrimeiroTime.push(nomejogador);
        const index = this.listaEspera.indexOf(nomejogador);
        if(index > -1){
          this.listaEspera.splice(index, 1);
        }
      }
      if(this.listaSegundoTime.length === 0){
        this.timeFaltaEscalar = 2;
      } else {
        this.timeFaltaEscalar = 0;
        this.desabilitaEventoPartida = false;
      }
    } else {
      for(let i=0; i < lista.length ; i++){
        let nomejogador: string;
        nomejogador = lista[i].getLabel()
        this.listaSegundoTime.push(nomejogador);
        const index = this.listaEspera.indexOf(nomejogador);
        if(index > -1){
          this.listaEspera.splice(index, 1);
        }
      }
      if(this.listaPrimeiroTime.length === 0){
        this.timeFaltaEscalar = 1;
      } else {
        this.timeFaltaEscalar = 0;
        this.desabilitaEventoPartida = false;
      }
    }
  }
 
  incluirVitoriaPartida(time: number){
    // vitoria do primeiro time
    if(time === 1){
      for(let i=0; i < this.listaPrimeiroTime.length ; i++){
        this.incluirEventoPartida('vitoria', this.listaPrimeiroTime[i], 1);
      }
      for(let i=0; i < this.listaSegundoTime.length ; i++){
        this.listaEspera.push(this.listaSegundoTime[i]);
      }
      this.listaSegundoTime = [];
      this.timeFaltaEscalar = 2;
    } else {
      // vitoria do segundo time
      for(let i=0; i < this.listaSegundoTime.length ; i++){
        this.incluirEventoPartida('vitoria', this.listaSegundoTime[i], 2);
      }
      for(let i=0; i < this.listaPrimeiroTime.length ; i++){
        this.listaEspera.push(this.listaPrimeiroTime[i]);
      }
      this.listaPrimeiroTime = [];
      this.timeFaltaEscalar = 1;
    }
    this.placarPrimeiroTime =  0;
    this.placarSegundoTime = 0;
    this.desabilitaEventoPartida = true;
  }

  incluirEventoPartida(nomeEvento: string, nomeJogador: string, time: number){
    //1-gol, 2-assistencia, 3-vitoria
    
    let evento: IEventoPartida = {
      nomeJogador: nomeJogador,
      nomeEvento: nomeEvento
    }
    this.listaEventosPartida.push(evento);
    if(nomeEvento === 'gol'){
      if(time === 1){
        this.placarPrimeiroTime = this.placarPrimeiroTime + 1; 
      } else {
        this.placarSegundoTime = this.placarSegundoTime + 1; 
      }
    }
    this.incluirEstatisticaJogador(nomeJogador, nomeEvento);
    this.dataSource.data = this.listaEstatisticaJogador;

  }

  incluirEstatisticaJogador(nomeJogador: string, nomeEvento: string){
      let estatistica: IEstatisticaJogador = {
        nomeJogador: nomeJogador,
        quantidadeAssistencia: 0,
        quantidadeGol: 0,
        quantidadeVitoria: 0
      }

      const index = this.listaEstatisticaJogador.findIndex( p => p.nomeJogador === nomeJogador);
      if(index > -1 ){
        console.log(index);
        if(nomeEvento === 'assistencia'){
          this.listaEstatisticaJogador[index].quantidadeAssistencia += 1; 
        }
        if(nomeEvento === 'gol'){
          this.listaEstatisticaJogador[index].quantidadeGol += 1; 
        }
        if(nomeEvento === 'vitoria'){
          this.listaEstatisticaJogador[index].quantidadeVitoria += 1; 
        } 
      } else {
          console.log(index);
          if(nomeEvento === 'assistencia'){
            estatistica.quantidadeAssistencia += 1; 
          }
          if(nomeEvento === 'gol'){
            estatistica.quantidadeGol += 1; 
          }
          if(nomeEvento === 'vitoria'){
            estatistica.quantidadeVitoria += 1;
          }  
          this.listaEstatisticaJogador.push(estatistica);
      }
  }

  excluirJogadorPartida(time: number, nomeJogador: string){
    if(time === 1){
      const index = this.listaPrimeiroTime.indexOf(nomeJogador);
      if(index > -1){
        this.listaPrimeiroTime.splice(index, 1);
      }
      /*for(let i=0; i < lista.length ; i++){
        let nomejogador: string;
        nomejogador = lista[i].getLabel()
        const index = this.listaPrimeiroTime.indexOf(nomejogador);
        if(index > -1){
          this.listaPrimeiroTime.splice(index, 1);
        }
      }*/
    } else {
      /*for(let i=0; i < lista.length ; i++){
        let nomejogador: string;
        nomejogador = lista[i].getLabel()
        const index = this.listaSegundoTime.indexOf(nomejogador);
        if(index > -1){
          this.listaSegundoTime.splice(index, 1);
        }
      }*/
        const index = this.listaSegundoTime.indexOf(nomeJogador);
        if(index > -1){
          this.listaSegundoTime.splice(index, 1);
        }
    }
    // retorna jogador pra lista de espera
    this.incluirJogadorListaEspera(nomeJogador);
  }
}
