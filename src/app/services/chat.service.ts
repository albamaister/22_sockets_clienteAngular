import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage(mensaje: string) {
    const payload = {
      de: 'Andres',
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }

  getMessages() {// regresa un observable pero solo esta definido
    return this.wsService.listen( 'mensaje-nuevo' );
  }
}
