import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
   }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }
  // Metodo que se va a encargar de emitir todos los eventos que pueda disparar mi aplicacion de angular
  emit( evento: string, paylod?: any, callback?: Function ) {
    console.log('Emitiendo', evento);
    // emit('EVENTO', payload, callback)
    this.socket.emit(evento, paylod, callback);

  }

  listen( evento: string ) { // responsable de escuchar cualquier evento que emita el servidor
    return this.socket.fromEvent( evento );
  }
}
