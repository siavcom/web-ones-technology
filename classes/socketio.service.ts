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
  socket;
  url:string ='http://176.16.200.20:38080';
  id_con;
  def_con:{}
   
  

  constructor(def_con) {

    this.url=def_con.url

    const session = await Session()
       
    const { id_con } = storeToRefs(session)  //pasa los elementos por referencia al Global
    this.id_con=id_con
  }  

  setupSocketConnection() {
    this.socket = io(this.url,this.def_con);

// client-side
    this.socket.on("connect", () => {
      console.log(this.socket.id); 
    })

    this.socket.on('loginOk',(resp)=>{
      this.id_con.value=resp.id
      this.fpo_pge.value=resp.fpo_pge
      res={ id: name, dialect: options.dialect, fpo_pge }
      console.log('Conection sucefully id=',id_con)
     })
    
     this.socket.on('fail',()=>{
      this.socket.disconnect();
     })

  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  sendMessage(req){
    
   
    this.socket.emit(req.msg, req.data);



  }

} 



