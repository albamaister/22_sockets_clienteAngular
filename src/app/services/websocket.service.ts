import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario;

  constructor(private socket: Socket) {
    this.cargarStorage();
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

  loginWS( nombre: string ) {
    // console.log('Configurando', nombre);
    // this.socket.emit('configurar-usuario', { nombre }, ( resp ) => {
    //   console.log(resp);
    // });
    return new Promise(( resolve, reject ) =>  {

      this.emit('configurar-usuario', { nombre }, (resp) => {

        this.usuario = new Usuario( nombre );
        this.guardarStorage();
        resolve();
      });
    });

  }

  getUsuario() {
    return this.usuario;
  }

  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
      this.loginWS( this.usuario.nombre );
    }
  }
}
