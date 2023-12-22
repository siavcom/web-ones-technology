//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Teams report 
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportForm } from '@/classes/reportForm/reportForm'
import { tpy_tpy } from './tpy_tpy'
import { ven_ven } from './ven_ven'
import { est_tap } from './est_tap'
import { est_pry } from './est_pry'
import { per_pry } from './per_pry'
import { tap_tap } from './tap_tap'
import { des_fec } from './des_fec'
import { has_fec } from './has_fec'
import { equ_equ } from './equ_equ'

export class ThisForm extends reportForm {
  public tpy_tpy= new tpy_tpy()
  public ven_ven= new ven_ven()
  public est_tap= new est_tap()
  public est_pry= new est_pry()
  public per_pry= new per_pry()
  public tap_tap= new tap_tap()
  public des_fec= new des_fec()
  public has_fec= new has_fec()
  public des_fac= new des_fec()
  public has_fac= new has_fec()
  public equ_equ= new equ_equ()
  constructor() {
    super()  // inicializa la clase base
    this.tab_ord='comepry' // Tabla de donde tomara los campos para el orden de la vista
    this.prop.Name = 'comepry'
    this.prop.textLabel = "Proyectos"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_rep_comepry'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='rep_comepry'   // no incluir extencion jasper o jrxml
    this.tpy_tpy.prop.TabIndex = 1;
    this.des_fec.prop.TabIndex = 2;
    this.has_fec.prop.TabIndex = 3;
    this.per_pry.prop.TabIndex = 4;
    this.mon_rep.prop.TabIndex = 5;
    this.equ_equ.prop.TabIndex = 6;
    this.ven_ven.prop.TabIndex = 8;
    this.est_pry.prop.TabIndex = 7;
    this.tip_rep.prop.TabIndex = 9;
    this.tap_tap.prop.TabIndex = 10;
    this.des_fac.prop.TabIndex = 11;
    this.has_fac.prop.TabIndex = 12;
    this.est_tap.prop.TabIndex = 13;
    this.des_fac.prop.textLabel = "Desde la fecha de actividad";
    this.has_fac.prop.textLabel = "Hasta la fechade actividad";
    this.tip_rep.prop.textLabel = "Detalle de actividades";
  /*  this.tpy_tpy.style.zIndex=18  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
    this.per_pry.style.zIndex=16
    this.mon_rep.style.zIndex=14
    this.equ_equ.style.zIndex=12
    this.ven_ven.style.zIndex=8
    this.est_pry.style.zIndex=10
    this.tap_tap.style.zIndex=6
    this.var_ord.style.zIndex=2
    this.est_tap.style.zIndex=4
    */
    this.tip_rep.prop.Visible=true;
    this.tip_rep.prop.Disabled=false;
    this.des_fac.prop.Visible=false;
    this.des_fac.prop.Disabled=true;
    this.has_fac.prop.Visible=false;
    this.has_fac.prop.Disabled=true;
    
  }
  public async init(){
    await super.init()
    this.des_fec.prop.Value=this.publicVar.fpo_pge
    this.has_fec.prop.Value=this.publicVar.fpo_pge
    this.has_fec.prop.Min=this.des_fec.prop.Value
    this.des_fac.prop.Value=this.publicVar.fpo_pge
    this.has_fac.prop.Value=this.publicVar.fpo_pge
    this.has_fac.prop.Min=this.des_fac.prop.Value
  
    this.var_ord.prop.Value='num_pry'
   
  }
///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string,order: string) {
    let localWhere = "";
    const des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const des_fac =await dateToSql(this.Form.des_fac.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fac =await dateToSql(this.Form.has_fac.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep=this.tip_rep.prop.Value;
    const tpy_tpy=this.tpy_tpy.prop.Value;
    const var_ord=this.var_ord.prop.Value;
    const mon_rep=this.mon_rep.prop.Value;
    const est_tap=this.est_tap.prop.Value;
    const est_pry=this.est_pry.prop.Value;
    const per_pry=this.per_pry.prop.Value;
    const equ_equ=this.equ_equ.prop.Value;
    const ven_ven=this.ven_ven.prop.Value;
    const tap_tap=this.tap_tap.prop.Value;
    const vis_rep=this.vis_rep  
    
    if (tpy_tpy!= "?? ")
       { if (localWhere.length>0)
          localWhere = localWhere + ` and tpy_tpy='${tpy_tpy}' `
           else 
           localWhere = localWhere + ` tpy_tpy='${tpy_tpy}' `
       }
    if (ven_ven!= 0)
    { if (localWhere.length>0)
      localWhere = localWhere + ` and ven_ven=${ven_ven} `
       else 
       localWhere = localWhere + ` ven_ven=${ven_ven} `
   }
    if (est_pry!= "T")
    { if (localWhere.length>0)
          localWhere = localWhere + ` and est_pry='${est_pry}' `
      else 
      localWhere = localWhere + ` est_pry='${est_pry}' `
    }
   
    if (equ_equ!= "?? ")
    { if (localWhere.length>0)
      localWhere = localWhere +  ` and equ_equ='${equ_equ}' `
      else 
      localWhere = localWhere + ` equ_equ='${equ_equ}' `
    }
    if (per_pry!="T")
    { if (localWhere.length>0)
          localWhere = localWhere + ` and per_pry='${per_pry}' `
      else
          localWhere = localWhere + ` per_pry='${per_pry}' `
    }
    if (mon_rep!= 0)
    { if (localWhere.length>0)
         localWhere = localWhere + ` and mco_pry=${mon_rep} `
      else
          localWhere = localWhere + ` mco_pry=${mon_rep} ` 
    }

    if (tip_rep==1 ) {
        if (est_tap!= "T")
        { if (localWhere.length>0)
            localWhere = localWhere + ` and est_apy='${est_tap}' `
          else 
            localWhere = localWhere + ` est_apy='${est_tap}' `
        }
        if (tap_tap!= "?? ")
            { if (localWhere.length>0)
                  localWhere = localWhere + ` and tap_tap='${tap_tap}' `
              else
                  localWhere = localWhere + ` tap_tap='${tap_tap}' ` 
            }
    
            if (localWhere.length>0)
             localWhere=localWhere +  ` and fec_apy>='${des_fac}' AND fec_apy<='${has_fac}' `
            else 
              localWhere=localWhere +  ` fec_apy>='${des_fac}' AND fec_apy<='${has_fac}' `
      }
  
    if (where.length>0)
     where = ' AND '+where
          
  if (localWhere.length>0)
        localWhere=localWhere + 'and '
    localWhere=localWhere+`  fec_pry>='${des_fec}' AND fec_pry<='${has_fec}' `+where;

    //localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` select * from ${this.vis_rep} WHERE ${localWhere}  ` 
      
    );
    return ` select * from ${this.vis_rep} WHERE ${localWhere}  `  ;
  
   
  }
  
  } // End ThisForm
  

