//////////////////////////////////////////////
// Clase : classes/socketio.service.js
// Descripcion : Servicios de socket 
// Author : Fernando Cuadras Angulo
// Creacion : 6/Octubre/2023
// Ult.Mod  : 
/////////////////////////////////////////////


import { io } from 'socket.io-client';
import { storeToRefs } from "pinia";


export class SocketioService {
  socketIo;
  url:string ='http://176.16.200.20:38080';
  id_con;
  res:{};
  

  constructor() {

    const session = await Session()
       
    const { id_con,url } = storeToRefs(session)  //pasa los elementos por referencia al Global
    this.id_con=id_con.value
    this.url=url.value
    this.socketIo = io(this.url, {
      auth: { 
        id_con: this.id_con
       },
    });

    this.socketIo.on("broadcast", async (res: {}) => {
      this.res=res
      return
    });
  }  

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  sendMessage(req){
    this.socket.emit(req);
  }

} 



