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
  Development = false
  sw_ini = false
  Parent = {} //this.Dom.ctx; // Contexto
  Form = {} //this.Parent.ThisForm // Thisform

  eventos = [] // eventos a ejecutar en el stack
  estatus = []  // estatus de los componentes hijos
  header = []
  main : [] = []
  footer : [] = []
  params = []
  public db = new VFPDB();  // conexion a la base de datos
  //messageBox = MessageBox

  //  constructor(parent: Record<string, never>) {
  constructor() {
    super()
    this.prop.BaseClass = 'Form'
    this.prop.Name = 'ThisForm'
    this.prop.Map = 'ThisForm'
    this.prop.Position = ' '   // No hay posicion ya que es una forma
    this.Form = this
 

    this.prop.nem_pge = "Siavcom Software "
    this.prop.fpo_pge = new Date().toISOString().substring(0, 10); //  Fecha actual de la computadora cliente
    this.prop.log_emp = "/img/Logo_Empresa.png"
    
    this.style.maxWidth = '920px'
    //    this.style.maxHeight='920px'    

    // asigna los parametros pasados
    const router = useRoute()
    const { params } = useRoute()
    
    for (const par in router.query){
       this.params.push(router.query[par])

    }
    //console.log('ThisForm router params ==>',this.params)
    
    if (router.query.params ){
     // this.params=eval('['+router.query.params+']')
    console.log('ThisForm router Params===>',this.params)   
    }

    // asignamos en la clase db esta forma
    this.db.Form = this

  }

  /*
    prop = {
      Login: false,
      tag: '',
      Name: 'ThisForm',
      Map: 'ThisForm',
      Status: 'A',
      textLabel: '',
    }
    
    style = {
      background: "white",
      color: "#b94295",
      width: "1420px",
      height: "980px",
      fontSize: "13px", // automaticamente vue lo cambiara por font-size (para eso se utiliza la anotacion Camello)
      position: "center", //absolute,
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignContent: 'flex-start',
      marginLeft: 'auto',
      left: 0,
      Top: 0,
      backgroundImage: "/img/Logo_Empresa.bmp",
      textAlign: 'start',
    };
  
    posicion: any = {}
    */

  ///////////////////////////////////////////////////////////
  // Init
  ////////////////////////////////////////////////
  //public Init = async (Form) => {  Las Funciones arrow son funciones no metodos
  //    async Init(Form) {
  public async Init() {  //Form est?: any
    this.init() // Corre el init de la forma
    let  TabIndex= 1
    let maxTabIndex =1
    let id = 0
    let comp = {}
    let header :[] = []
    let main :[] = []
    let footer = []
    const elements :[] = []
    for (const componente in this) {
      if (componente != 'Parent' &&
        componente != 'ThisForm' &&
        componente != 'Form' &&
        this[componente] != null &&
        this[componente] != undefined &&
        this[componente] &&
        this[componente].prop &&
        this[componente].InitForm) {
        const name = this[componente].prop.Name

        if (this[componente].prop && this[componente].prop.Position == 'header')
          header.push(name)

        if (this[componente].prop && this[componente].prop.Position == 'main'){
          main.push(name)
          if (this[componente].prop.TabIndex==0) {
            this[componente].prop.TabIndex=TabIndex
            TabIndex++
          } else 
            TabIndex=this[componente].prop.TabIndex+1


          if (maxTabIndex<TabIndex)
              maxTabIndex=TabIndex

        }
        if (this[componente].prop && this[componente].prop.Position == 'footer')
          footer.push(name)
      
          elements.push({
            Name: this[componente].prop.Name,
            Id: this[componente].prop.Order
          })

        this[componente]['Parent'] = this // ref(this)
        this[componente]['InitForm'](this)  // Corre el InitForm en todos los componentes
        if (this[componente]['init']) await this[componente]['init'] // Init del componente
        id++
      }
    }


    this.header = header
    this.main = main
    this.elements = elements
    TabIndex=maxTabIndex  // asignamos el TabIndex maximo de elementos
    for (let i=footer.length-1;i>=0;i--){
        //console.log('Form footer ',footer[i])
        this[footer[i]].prop.TabIndex=TabIndex
        TabIndex++
    }



    this.footer = footer.reverse()

    console.log('Form init header',this.header)
    console.log('Form init main',this.main)
    console.log('Form init footer',this.footer)
    console.log('Form init elements',this.elements)



  }


  public Salir = new class extends COMPONENT {

    constructor() {
      super()
      this.Index = 50
      this.prop.Name = 'Salir'
      this.prop.Value = "Salir";
      this.prop.Capture = false;
      this.prop.Valid = false;
      this.prop.BaseClass = 'imgButton'
      this.prop.Position = 'footer'
      this.prop.Image = "/Iconos/svg/bx-exit.svg";
      //this.prop.Image = "/Iconos/exit.png"
      this.style.fontSize = '16px'
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

//export const VueForm = new FORM();
//export const form = new FORM();
