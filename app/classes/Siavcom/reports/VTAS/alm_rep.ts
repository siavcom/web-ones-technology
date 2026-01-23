//////////////////////////////////////////////
// @baseClass  : component
// @class : alm_rep
// Description : Almacenes
// @author: El Fer Blocks
// Creation : 2023-09-20
// Update Date  :
/////////////////////////////////////////////
///////////////////////////////////////
// base class
///////////////////////////////////////
import { COMPONENT } from "@/classes/Component";
export class alm_rep extends COMPONENT {
  constructor() {
    super();

    this.prop.Caption = "Almacen";
    this.prop.BaseClass = "comboBox";
    this.prop.RowSourceType = 4;  //1-Value, 2-Alias,3-Query SQL Server,4 -Query Local SQL , 5-Array
    this.prop.ColumnCount = 2;
    this.prop.BoundColumn = 2;
    this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
    this.prop.Value = "?? ";
    this.style.maxHeight = "200px";
    this.inputStyle.width = "240px";
    this.prop.MultiSelect = false;
    this.style.width = "auto";
    //this.style.zIndex=5  // Profundidad en eje Z. Mientras mas pequeño el objeto esta mas atras, mientras mas grande esta mas enfrente
  }


  override async init() {
    const data = await SQLExec(`select tda.ALM_TDA alm_tda,tda.DES_TDA des_tda,isnull(tra.ALM_TDA,' ') alm_tra,isnull(tra.DES_TDA,' ') des_tra,
    left(tda.UBI_TDA,8) ubi_tda  from man_cometda tda 
    left join man_cometda tra on tra.alm_tda=case when charindex(',',tda.UBI_TDA)>0 
    then SUBSTRING(tda.ubi_tda,charindex(',',tda.UBI_TDA)+1,LEN(rtrim(tda.UBI_TDA))-charindex(',',tda.UBI_TDA)) else ' ' end
    union select '?? ',' Todos ',' ',' ',' '  order by tda.ALM_TDA ` , 'loc_cometda')

    //      select des_tda,alm_tda,left(ubi_tda,8) ubi_tda from man_cometda  union select '  Todos ' as des_tda,'?? ' as alm_tda,' ' as ubi_tda order by des_tda  `,'loc_cometda' ) 
    switch (this.Form.prop.Name) {

      case 'come3241': {
        this.prop.RowSource = "select des_tda,alm_tda,ubi_tda from now.loc_cometda order by des_tda "
        this.prop.ColumnCount = 3
        this.prop.BoundColumn = 2;
        this.prop.ColumnWidths = "60%,15%,25%"; // Puede ser en puntos 60px,30px /
        this.inputStyle.width = "300px";
        break;
      }
      case 'come5206': {
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.RowSource = `select des_tda,alm_tda  from now.loc_cometda 
         order by des_tda `
        this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
        break;
      }
      case 'come5232': {
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 2;
        this.prop.RowSource = `select des_tda,alm_tda  from now.loc_cometda where alm_tda='AT '
         order by des_tda `
        this.prop.ColumnWidths = "75%,25%"; // Puede ser en puntos 60px,30px /
        break;
      }
      case 'come3237': {
        this.prop.BoundColumn = 2;
        this.prop.ColumnCount = 4;
        this.prop.RowSource = `select des_tda,alm_tda,alm_tra,des_tra  from now.loc_cometda 
         order by des_tda `
        this.prop.ColumnWidths = "40%,10%,10%,40%"; // Puede ser en puntos 60px,30px /
        break;
      }
      default: {
        this.prop.RowSource = "select des_tda,alm_tda from now.loc_cometda order by des_tda "
        break;
      }

    }
  }
}