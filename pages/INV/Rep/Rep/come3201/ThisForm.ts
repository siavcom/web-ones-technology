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
    this.prop.Name = 'come3201'
    this.prop.textLabel = "Catálogo de insumos"
    this.prop.Status = 'A'
    this.prop.Development=true
    this.vis_rep = 'vi_come3201'   // nombre de la vista sql a utilizar en el reporte
    this.for_imp.prop.Value ='jr_come3201'   // no incluir extencion jasper o jrxml
    this.tip_rep.prop.Visible=false    // Muestra general odetallado
    this.mon_rep.prop.Visible=false
    this.des_fec.prop.Visible=false
    this.has_fec.prop.Visible=false 
    this.des_isu.prop.Visible=false
    this.has_isu.prop.Visible=false
    this.tdo_tdo.prop.Visible=false
    this.alm_rep.prop.Visible=false
    this.sep_fam.prop.TabIndex=1
    this.num_fam.prop.TabIndex=2
    this.des_fam.prop.TabIndex=3
    this.has_fam.prop.TabIndex=4
    this.tip_imp.prop.TabIndex=5
    this.tip_imp.prop.RowSource=[["General","Detallado","Solo datos SAT"], [1,2,3]]
    
   
  } 

public async init(){
  await super.init()
  
  this.var_ord.prop.Value="";
    console.log(
    "===================>Init Report name=",
    this.prop.Name,
    "var_ord",
    this.var_ord.prop.Value="cla_isu"
  );
  
}

  ///////////////////////////////////////////////////////////////
  // En caso de tener que generar el query del select del report
  ///////////////////////////////////////////////////////////////
  async interactiveChange() {
  
    if (this.Form.tip_imp.prop.Value == 1) 
      // Detallado
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_d";
    if (this.Form.tip_imp.prop.Value == 2)
      this.Form.for_imp.prop.Value = this.Form.for_ori + "_s";
    
    }

  public async sqlQuery(where: string,order: string) {
    const ima_pge=this.Form.publicVar.ima_pge;
    const sep_fam=this.sep_fam.prop.Value;
    const des_fam=this.des_fam.prop.Value;
    const has_fam=this.has_fam.prop.Value;
    const num_fam=this.num_fam.prop.Value;
    const var_ord=this.var_ord.prop.Value;
    var pri_cla=0,
        ult_cla=29,
        pos_tom=30,
        fam_num=1,
        cn_i=0;
    let localWhere="";
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
        localWhere=`substring(cla_isu,${pri_cla},${pos_tom})>='${des_fam}' and substring(cla_isu,${pri_cla},${pos_tom})<='${has_fam}' ` ;    
    }
       else localWhere = `tin_tti<>' '  `;   
    
    if (where.length>0)
       where = ' AND '+where
       localWhere =
       localWhere +where;
   
     console.log(
      "sqlQuery =",
      `select * from ${this.vis_rep} WHERE ${localWhere}  ${order} `
    );
    return `select * from ${this.vis_rep} WHERE ${localWhere}  ${order}`;
  }
   
   

} // End ThisForm
