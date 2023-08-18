//////////////////////////////////////////////
// Clase : Form Base
// Author : Fernando Cuadras Angulo
// Creacion : Septiembre/2021
// Ult.Mod  : 18/Noviembre/2022
/////////////////////////////////////////////
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
import {
  inject,
  //getCurrentInstance,
  ref
} from "vue";
*/
import { COMPONENT } from '@/classes/Component'
import { VFPDB } from "@/classes/DataBase"
////import { MessageBox } from '@/classes/Functions'
//import { stringifyQuery } from "vue-router";


export class FORM extends COMPONENT {
 
  //Dom: any = getCurrentInstance();
  //Parent = {} //this.Dom.ctx; // Contexto
  //Form = {} //this.Parent.ThisForm // Thisform
  loading= true
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  Params = []
  public db = new VFPDB()  // conexion a la base de datos
  Public={}  // Variables publicas
  //messageBox = MessageBox

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    
    this.prop.BaseClass = 'Form'
    this.prop.Name = 'ThisForm'
    this.prop.Map = 'ThisForm'
    this.prop.Position = ' '   // No hay posicion ya que es una forma
    this.Form = this

    this.style.width='90%'
    this.style.height='96%'
    // this.style.maxWidth = '100%'
    //    this.style.maxHeight='920px'    

    // asigna los parametros de la llamada a esta forma (VFP parameters) 
    const router = useRoute()
    const { params } = useRoute()
    
    
    for (const par in router.query){
       this.Params.push(router.query[par])
       console.log('ThisForm.Params ==>',this.Params)

    }
    
    if (router.query.params ){
     // this.params=eval('['+router.query.params+']')
    console.log('ThisForm router Params===>',params,router.query.params)   
    }

    // asignamos en la clase db esta forma
    this.db.Form = this


   // this.style.backgroundImage= "/img//Logo_Empresa.bmp",

  }

  public async afterMounted(){

  }
  public Salir = new class extends COMPONENT {
    Development = false 
    constructor() {
      super()
      this.Index = 50
      this.prop.Name = 'Salir'
      this.prop.Value = "Salir";
      this.prop.Capture = false;
      this.prop.Valid = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Image = "/Iconos/exit4-color.svg";
      //this.prop.Image = "/Iconos/exit.png"
      this.style.width='30px'
      this.style.fontSize = '13px'
      this.style.color = 'green'
      this.style.backgroundColor = 'white'
      this.prop.TabIndex = 50

      //this.style.height='80px'

    } // Fin constructor

    public click = async () => {
      if (await MessageBox("Seguro ,salimos de la forma", 4, '') == 6)

        window.history.back(); // regresa forma anterior
    }
  }

}
