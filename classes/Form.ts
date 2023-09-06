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
import { storeToRefs } from 'pinia'

export class FORM extends COMPONENT {

  //Dom: any = getCurrentInstance();
  //Parent = {} //this.Dom.ctx; // Contexto
  //Form = {} //this.Parent.ThisForm // Thisform
  loading = true
  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  Params = []
  public db = new VFPDB()  // conexion a la base de datos
  Var = {}

  //messageBox = MessageBox
  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.BaseClass = 'Form'

    this.prop.Map = this.constructor.name
    this.prop.Position = ' '   // No hay posicion ya que es una forma
    this.Form = this

    this.style.width = '90%'
    this.style.height = '96%'
    // this.style.maxWidth = '100%'
    //    this.style.maxHeight='920px'    

    // asigna los parametros de la llamada a esta forma (VFP parameters) 
    const router = useRoute()
    const { params } = useRoute()


    for (const par in router.query) {
      this.Params.push(router.query[par])
      console.log('ThisForm.Params ==>', this.Params)

    }

    if (router.query.params) {
      // this.params=eval('['+router.query.params+']')
      console.log('ThisForm router Params===>', params, router.query.params)
    }

    // asignamos en la clase db esta forma
    this.db.Form = this
    const {Var}=storeToRefs(this.db.session)
    const RefVar=Var.value
   
    for (const comp in RefVar){
      this.Var[comp]=RefVar[comp]
    }

      
    
    // this.style.backgroundImage= "/logos/Logo_Empresa.png",

  }

//////////////////////////////
// Salir de la forma
//////////////////////////////

   clickSalir = async () => {
    if (await MessageBox("Salimos de la forma", 4, '') == 6){
      window.history.back()
     // window.close() // cierra la forma history.back(); // regresa forma anterior
  }}
  

  public async afterMounted() {

  }
 

}