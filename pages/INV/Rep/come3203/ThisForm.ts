//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Documentos
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-03-17
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/reports/INV/reportInv'
export class ThisForm extends reportInv {
   
  constructor() {
    super()  // inicializa la clase base
    this.tab_ord='comeisu'
    this.prop.Name = 'come3203'
    this.prop.textLabel = "Existencias"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come3203'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='jr_come3203'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible=true    // Muestra general odetallado
    this.tip_rep.prop.Disabled=false
    this.mon_rep.prop.Visible=false 
    this.mon_rep.prop.Disabled=true 
    this.tdo_tdo.prop.Visible=false;
    this.tdo_tdo.prop.Disabled=true;
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    
 
  } 

public async init(){
  await super.init()
    this.var_ord.prop.Value="";
    console.log(
    "===================>Init Report name=",
    this.prop.Name,
    "var_ord",
    this.var_ord.prop.Value
  );
  
}

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string,order: string) {
    let localWhere = "";
    const des_fec =await dateToSql(this.Form.des_fec.prop.Value); //dateToSql(this.Form.des_fec.Value)
    const has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const tip_rep=this.tip_rep.prop.Value;
    const tip_imp=this.Form.tip_imp.prop.Value;
    const ini_isu=this.des_isu.prop.Value;
    const fin_isu=this.has_isu.prop.Value;
    const alm_rep=this.Form.alm_rep.prop.Value;
    const var_ord=this.var_ord.prop.Value;
    const ima_pge=this.Form.publicVar.ima_pge;
    const sep_fam=this.sep_fam.prop.Value;
    const des_fam=this.des_fam.prop.Value;
    const has_fam=this.has_fam.prop.Value;
    const num_fam=this.num_fam.prop.Value;
    
    var pri_cla=0,
        ult_cla=29,
        pos_tom=30,
        fam_num=1,
        cn_i=0;
    
    if (sep_fam==1)
       {
         pri_cla=0;
         //ult_cla=ima_pge.trim.length;
         console.log("ult_cla="+ult_cla)
        if (this.Form.has_fam.prop.Value<this.Form.des_fam.prop.Value || this.Form.has_fam.prop.Value.length==0)
          this.Form.has_fam.prop.value="ZZZZZ";
        				// número de familia
        
        while (cn_i>-1 && fam_num<=num_fam)
           {
              cn_i=ima_pge.indexOf('-',cn_i+1)
              if (cn_i>-1)
              {
                if (fam_num==num_fam)
                  ult_cla=cn_i
                else
                  pri_cla=cn_i+1
                fam_num=fam_num+1
              }
      
           }
       pos_tom=ult_cla-pri_cla ; 
       pri_cla=pri_cla+1;
       localWhere=localWhere+` (substring(cla_isu,${pri_cla},${pos_tom})>='${des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<="${has_fam}") ` ;    
       if (where.length>0)
       where = ' AND '+where
       localWhere =
       localWhere +where;
      }
      localWhere=localWhere.replaceAll("'",'"')  
    console.log(
      "sqlQuery =",
      ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}'  ` 
      
    );
    //return `select * from ${this.vis_rep} WHERE ${localWhere} `;
   
  return ` EXEC p_come3203 '${des_fec}','${has_fec}','${ini_isu}','${fin_isu}','${alm_rep}','${localWhere} ',${tip_rep},${tip_imp},'${var_ord}' ` ;
  
   
}

} // End ThisForm

