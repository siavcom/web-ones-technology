//////////////////////////////////////////////
// BaseClass : reportForm
// Class : Teams
// Description : Documentos
// Author : El Fer Blocks (Fernando Cuadras)
// Creation : 2023-10-25
// Update Date  : 
/////////////////////////////////////////////

///////////////////////////////////////
// Base class 
///////////////////////////////////////

import { reportInv } from '@/classes/reports/INV/reportInv'
import { dia_ppe } from './dia_ppe';
import { opc_uno } from './opc_uno';
import { opc_dos } from './opc_dos';
import { opc_tres } from './opc_tres';

export class ThisForm extends reportInv {
  public dia_ppe = new dia_ppe()
  public opc_uno = new opc_uno()
  public opc_dos = new opc_dos()
  public opc_tres = new opc_tres()
  
  constructor() {
    super()  // inicializa la clase base
    this.tab_ord='comeisu'
    this.prop.Name = 'come3241'
    this.prop.textLabel = "Puntos de reorden con detalle de ped.cte,ped.pve y merc.tránsito"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come3201'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='jr_come3241'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible=false    // Muestra general odetallado
    this.mon_rep.prop.Visible=false 
    this.des_fec.prop.Visible=false
    this.tdo_tdo.prop.Visible=false
    this.tip_imp.prop.Visible=false
    this.sep_fam.prop.Visible=false;
    this.bt_pdf.prop.Visible=false;
    this.Form.bt_pdf.prop.Disabled=true;
    this.has_fec.prop.TabIndex=1;
    this.alm_rep.prop.TabIndex=2;
    this.dia_ppe.prop.TabIndex=3;
    this.opc_uno.prop.TabIndex=4;
    this.opc_dos.prop.TabIndex=5;
    this.opc_tres.prop.TabIndex=6;
    this.des_isu.prop.TabIndex=7;
    this.has_isu.prop.TabIndex=8;
    this.sep_fam.prop.TabIndex=9;
    this.num_fam.prop.TabIndex=10;
    this.des_fam.prop.TabIndex=11;
    this.has_fam.prop.TabIndex=12;
    this.alm_rep.prop.RowSource = "select des_tda,alm_tda,left(ubi_tda,8) from man_cometda order by des_tda "
    this.alm_rep.prop.ColumnCount = 3
    this.alm_rep.prop.ColumnWidths ="60%,15%,25%"; // Puede ser en puntos 60px,30px /
             
    //this.dataView:string ='vcomepge'    // Vista de datos generales
    //this.sqlQuery=' `select des_tdo from cometdo where tdo_tdo=${this.Form.tdo_tdo.Value}` '             // Query a ejecutar antes de la vista del reporte
    
 
  } 
  
public async init(){
  await super.init()
  this.var_ord.prop.Value="cla_isu";
 
}

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////

  public async sqlQuery(where: string,order: string) {
    let localWhere = where;
    const has_fec =await dateToSql(this.Form.has_fec.prop.Value); //dateToSql(this.Form.has_fec.Value)
    const ini_isu=this.des_isu.prop.Value;
    const fin_isu=this.has_isu.prop.Value;
    const alm_rep=this.Form.alm_rep.prop.Value;
    const var_ord=this.var_ord.prop.Value;
    const ima_pge=this.Form.publicVar.ima_pge;
    const sep_fam=this.sep_fam.prop.Value;
    const des_fam=this.des_fam.prop.Value;
    const has_fam=this.has_fam.prop.Value;
    const num_fam=this.num_fam.prop.Value;
    const dia_ppe=this.dia_ppe.prop.Value;
    const opc_uno=this.opc_uno.prop.Value;
    const opc_dos=this.opc_dos.prop.Value;
    const opc_tres=this.opc_tres.prop.Value;
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
        localWhere=localWhere+` and (substring(cla_isu,${pri_cla},${pos_tom})>='${des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<="${has_fam}") ` ;    
        localWhere=localWhere.replaceAll("'",'"')
      }
    console.log(
      "sqlQuery =",
      ` EXEC p_come3241 '${has_fec}','${alm_rep}','${ini_isu}','${fin_isu}',${dia_ppe},'${localWhere} ','${var_ord}',${opc_uno},${opc_dos},${opc_tres}  ` 
      
    );
    //return `select * from ${this.vis_rep} WHERE ${localWhere} `;
   
  return ` EXEC p_come3241 '${has_fec}','${alm_rep}','${ini_isu}','${fin_isu}',${dia_ppe},'${localWhere} ','${var_ord}',${opc_uno},${opc_dos},${opc_tres} ` ;
  
   
}

} // End ThisForm

