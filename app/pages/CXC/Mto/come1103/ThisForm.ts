
// ----------------------------------------------------------------------------------------------
//              Siavcom Software S. de R.L. de C.V.
// ----------------------------------------------------------------------------------------------
// Autor     : Ing. Fernando Cuadras Angulo
// Sistema   : Siavcom         Version : 6.0  Windows
// Programa  : Mantenimiento a cargos y abonos Mnemo   : come1103.scx
// Ult. mod. : Fernando Cuadras      Fecha   : 15/02/99
// Evento  : Init
// Objeto  : come1103
// Tipo   : Form
// Comentarios : 
//             vi_cap_comedoc -> vi_cap_comedoc   vista de captura de docuemntos de pago
// ----------------------------------------------------------------------------------------------
//m: gra_doc  && Graba los datos de un documento despues de una captura o medificacion
//m: rev_per  && Revisa permisos de usuarios de utilizacion de un objeto
//p: aut_cap  && Bt_autorizacion de captura
//p: cod_cap  && Código de captura
//p: con_vcomesal  && Condicion del vcomesal
//p: dca_pag  && Decimales de captura para pagos
//p: doc_pagados  && Para poder asignar el objeto
//p: lim_inf_sal  && Limite inferior para mostrar documentos no pagados
//p: num_mov  && Numero de movimeintos que tiene el documento
//p: sw_ctb  && Sw indicando si se tiene la contabilidad en linea
//p: sw_imp  && Switch de Impuestos
//p: sw_pga  && Switch de presupuesto de gasto
//p: top_con  && Topoe de consulta de la vista vcomesal
//p: val_che_doc  && Valida cheque de documento
//a: nom_obj[50,2]

///////////////////////////////////////
// Base class
///////////////////////////////////////

import { captureForm } from "@/classes/CaptureForm";

import { tdo_tdo } from '@/classes/Siavcom/Doctos/tdo_tdo';
import { ndo_doc } from '@/classes/Siavcom/Doctos/ndo_doc';
import { tcd_tcd } from '@/classes/Siavcom/Doctos/tcd_tcd';
import { ref_doc } from '@/classes/Siavcom/Doctos/ref_doc';


import { fec_doc } from '@/classes/Siavcom/Doctos/fec_doc';
import { d_fel_doc } from '@/classes/Siavcom/Doctos/d_fel_doc';
import { fve_doc } from '@/classes/Siavcom/Doctos/fve_doc';

import { ven_ven } from '@/classes/Siavcom/Doctos/ven_ven';
import { com_doc } from '@/classes/Siavcom/Doctos/com_doc';

import { cba_cba } from './cba_cba';
import { che_doc } from './che_doc';

//import { co_xml } from './co_xml';
import { cod_nom } from './cod_nom';
import { rfc_pve } from "./rfc_pve";

//import { Bt_apl_pag } from './Bt_apl_pag';
import { d_coa_tdo } from '@/classes/Siavcom/Doctos/d_coa_tdo';
import { d_sta_doc } from '@/classes/Siavcom/Doctos/d_sta_doc';

import { d_pap_doc } from './d_pap_doc';
//import { Bt_doc_por_pagar } from './Bt_doc_por_pagar';
import { d_sal_cta } from './d_sal_cta';
import { d_sal_doc } from './d_sal_doc';

import { Do_nopagados } from './Do_nopagados';

import { hrs_doc } from './hrs_doc';

import { imp_doc } from '@/classes/Siavcom/Doctos/imp_doc';
import { im0_doc } from '@/classes/Siavcom/Doctos/im0_doc';
import { im1_doc } from '@/classes/Siavcom/Doctos/im1_doc';
import { im2_doc } from '@/classes/Siavcom/Doctos/im2_doc';
import { im3_doc } from '@/classes/Siavcom/Doctos/im3_doc';
import { im4_doc } from '@/classes/Siavcom/Doctos/im4_doc';
import { im5_doc } from '@/classes/Siavcom/Doctos/im5_doc';
import { d_tot_doc } from '@/classes/Siavcom/Doctos/d_tot_doc';
import { d_total } from '@/classes/Siavcom/Doctos/d_total';

import { mon_doc } from '@/classes/Siavcom/Doctos/mon_doc';

import { tpy_tpy } from "@/classes/Siavcom/Doctos/tpy_tpy";
import { num_pry } from '@/classes/Siavcom/Doctos/num_pry';
import { Bt_observaciones } from './Bt_observaciones';
//import { Otro } from './Otro';

import { suc_pge } from '@/classes/Siavcom/Doctos/suc_pge';
import { top_nom } from './top_nom';


//import { Bt_veri_xml } from './Bt_veri_xml';
import { vmo_doc } from '@/classes/Siavcom/Doctos/vmo_doc';
import { Bt_campos_xml } from '@/classes/Siavcom/Doctos/Bt_campos_xml';

import { Bt_imprime } from "./Bt_imprime";
import { Bt_timbra } from "./Bt_timbra";

import { report } from "./report/report";

import { ap_pagos } from './ap_pagos';
import { Bt_autorizacion } from '@/classes/Siavcom/Doctos/Bt_autorizacion';
import { Bt_dre_doc } from '@/classes/Siavcom/Doctos/Bt_dre_doc';


import { Bt_can_docto } from '@/classes/Siavcom/Doctos/Bt_can_docto';
import { captura_xml } from './captura_xml';
import { Bt_carga_xml } from './Bt_carga_xml';


let thisForm = ref()

const tot_doc = computed(() => {

	// utilizamos todas los valores de los importes para calcular el total
	// como son variables reactivas, se actualizan automaticamente
	const total = thisForm.value.imp_doc.prop.Value +
		thisForm.value.im0_doc.prop.Value +
		thisForm.value.im1_doc.prop.Value +
		thisForm.value.im2_doc.prop.Value +
		thisForm.value.im3_doc.prop.Value +
		thisForm.value.im4_doc.prop.Value +
		thisForm.value.im5_doc.prop.Value
	pap_doc(total)

	//if (thisForm.value.Recno == 0) 
	//	return 0

	return 0
})

const pap_doc = (total: number) => {
	if (thisForm.value.Recno == 0) {
		nextTick(() => {
			thisForm.value.d_pap_doc.prop.Value = 0
			thisForm.value.d_tot_doc.prop.Value = 0
		})
		return
	}
	nextTick(() => {
		thisForm.value.d_pap_doc.prop.Value = total - thisForm.value.d_sal_doc.prop.Value
		thisForm.value.d_tot_doc.prop.Value = total
	})
	return
}

export class ThisForm extends captureForm {
	public tdo_tdo = new tdo_tdo()
	public ndo_doc = new ndo_doc()
	public tcd_tcd = new tcd_tcd()

	public d_coa_tdo = new d_coa_tdo()
	public d_sta_doc = new d_sta_doc()

	public ref_doc = new ref_doc()
	public cod_nom = new cod_nom()

	public cba_cba = new cba_cba()

	public che_doc = new che_doc()
	public d_sal_cta = new d_sal_cta()
	public d_fel_doc = new d_fel_doc()
	public fec_doc = new fec_doc()
	public hrs_doc = new hrs_doc()
	public fve_doc = new fve_doc()

	public tpy_tpy = new tpy_tpy()
	public num_pry = new num_pry()

	public ven_ven = new ven_ven()
	public com_doc = new com_doc()

	public mon_doc = new mon_doc()
	public vmo_doc = new vmo_doc()
	public suc_pge = new suc_pge()

	// Totales importes
	public imp_doc = new imp_doc()
	public im0_doc = new im0_doc()
	public im1_doc = new im1_doc()
	public im2_doc = new im2_doc()
	public im3_doc = new im3_doc()
	public im4_doc = new im4_doc()
	public im5_doc = new im5_doc()
	public d_tot_doc = new d_tot_doc()
	public d_total = new d_total()

	// Proveedor
	public rfc_pve = new rfc_pve()

	// Aplicacion de pagos
	public ap_pagos = new ap_pagos()
	//public Bt_bor_asi_pag = new Bt_bor_asi_pag()

	// Botones de acciones

	public Bt_dre_doc = new Bt_dre_doc()
	public Bt_observaciones = new Bt_observaciones()
	public Bt_carga_xml = new Bt_carga_xml()
	public Bt_autorizacion = new Bt_autorizacion()

	public captura_xml = new captura_xml()

	public Bt_can_docto = new Bt_can_docto()
	//public bt_delete = new bt_delete()

	//	public xml = new xml()
	//	public Bt_veri_xml = new Bt_veri_xml()
	//	public co_xml = new co_xml()

	public d_pap_doc = new d_pap_doc()
	public d_sal_doc = new d_sal_doc()

	public Do_nopagados = new Do_nopagados()

	//public Imprime = new Imprime()
	public top_nom = new top_nom()

	public Bt_imprime = new Bt_imprime()
	public Bt_timbra = new Bt_timbra()
	public Bt_campos_xml = new Bt_campos_xml()
	public report = new report()


	// propiedades 
	aut_cap: boolean // Switch de autorizacion
	cod_cap: string // Código de captura
	con_vcomesal: string // Condicion del vcomesal
	dca_pag: number // Decimales de captura para pagos

	lim_inf_sal: string // Limite inferior para mostrar documentos no pagados
	num_mov: number // Numero de movimeintos que tiene el documento
	sw_ctb: boolean // Sw indicando si se tiene la contabilidad en linea
	//sw_imp: string // Switch de Impuestos
	sw_pga: boolean // Switch de presupuesto de gasto

	val_che_doc: string // Valida cheque de documento

	top_con = ''
	tip_cap = 'C'


	//this.Form.d_tot_doc.prop.Value = vi_cap_comedoc.imp_doc + vi_cap_comedoc.im0_doc + vi_cap_comedoc.im1_doc + vi_cap_comedoc.im2_doc + vi_cap_comedoc.im3_doc + vi_cap_comedoc.im4_doc + vi_cap_comedoc.im5_doc
	//imp_doc = ref(0)
	//totalDoc = ref(0)

	constructor() {
		super();
		this.Name = 'come1103';
		this.prop.RecordSource = 'vi_cap_comedoc'
		this.aut_cap = false;
		this.prop.Caption = "Cargos y abonos";
		this.cod_cap = '';
		this.con_vcomesal = '';
		this.dca_pag = 5;
		this.prop.Help_url = "/Archivos/Ctas%20x%20cobrar/Mantenimiento/cargos%20y%20abonos/CARGOS%20Y%20ABONOS.html"
		this.lim_inf_sal = '0.00999';
		this.num_mov = 0;
		this.sw_ctb = false;
		//this.Public.value.sw_imp = false;
		this.sw_pga = false;
		this.val_che_doc = '0';
		this.bt_delete.prop.Caption = "Borra documento";
		this.bt_save.prop.Caption = "Graba documento";
		thisForm.value = this;

		//this.d_tot_doc.prop.Value = tot_doc
		this.d_total.prop.Value = tot_doc
		//this.Form.d_pap_doc.prop.Value = pap_doc
		//	this.totalDoc.value = tot_doc


		//this.style.display = 'flex'
		//this.style.flexWrap = 'wrap'

		/*
				this.mainStyle.display = 'flex'
				this.mainStyle.alignItems = 'last baseline'
				this.mainStyle.justifyContent = 'space-around'
				this.mainStyle.height = 'fit-content'
		*/

		this.prop.Messages[0] = "Saldo caja chica"
		this.prop.Messages[1] = 'Cargos y abonos a vendedores'
		this.prop.Messages[2] = 'Cargos y abonos de clientes'
		this.prop.Messages[3] = 'Cliente'
		this.prop.Messages[4] = 'Gastos CEDIS'
		this.prop.Messages[5] = 'Cargos y abonos de proveedores'
		this.prop.Messages[6] = 'Proveedor'
		this.prop.Messages[7] = 'Abono'
		this.prop.Messages[8] = 'No afecta'
		this.prop.Messages[9] = 'Cargo'
		this.prop.Messages[10] = 'Documentos no pagados'
		this.prop.Messages[11] = 'El pago aplica a los documentos'
		this.prop.Messages[12] = 'Datos personalizados (XML)'
		this.prop.Messages[13] = 'No se puede grabar un documento sin importe'
		this.prop.Messages[14] = 'No se puede modificar el documento'
		this.prop.Messages[15] = 'No se puede borrar el documento'
		this.asignaRecno()

		this.block[0] = structuredClone(this.container)
		this.block[0].prop.Visible = true
		this.block[0].title = 'Documento'
		this.block[0].style.width = 'auto'
		this.block[0].component = {
			[0]: this.tdo_tdo,
			[1]: this.ndo_doc,
			[2]: this.tcd_tcd,
			[3]: this.d_coa_tdo,
			[4]: this.d_sta_doc,
			[5]: this.ref_doc,
			[6]: this.cod_nom,

			[7]: this.rfc_pve,
			[8]: this.cba_cba,
			[9]: this.d_sal_cta,
			[10]: this.che_doc,
			[11]: this.d_fel_doc,
			[12]: this.fec_doc,
			[13]: this.hrs_doc,
			[14]: this.fve_doc,

			[17]: this.ven_ven,

			[19]: this.com_doc,
			[20]: this.mon_doc,
			[21]: this.vmo_doc,
			//[22]: this.Bt_par_doc,
			//	[23]: this.par_mon,
			[22]: this.suc_pge,
			[23]: this.d_total


		}

		this.block[1] = structuredClone(this.container)
		this.block[1].prop.Visible = false
		this.block[1].title = 'Proyecto'
		this.block[1].style.width = '400px'
		this.block[1].component = {
			[0]: this.tpy_tpy,
			[1]: this.num_pry
		}

		this.block[2] = structuredClone(this.container)
		this.block[2].prop.Visible = true
		this.block[2].title = 'Totales'
		this.block[2].style.width = '210px'
		this.block[2].component = {
			[0]: this.imp_doc,
			[1]: this.im0_doc,
			[2]: this.im1_doc,
			[3]: this.im2_doc,
			[4]: this.im3_doc,
			[5]: this.im4_doc,
			[6]: this.im5_doc,
			[7]: this.d_tot_doc,
			[8]: this.d_sal_doc,
			[9]: this.d_pap_doc,
		}

		this.block[3] = structuredClone(this.container)
		this.block[3].prop.Visible = false
		this.block[3].title = this.prop.Messages[10]
		this.block[3].style.width = 'fit-content';
		this.block[3].component = {
			[0]: this.Do_nopagados
		}

		this.block[4] = structuredClone(this.container)
		this.block[4].prop.Visible = false
		this.block[4].title = this.prop.Messages[11]
		this.block[4].style.width = 'fit-content';
		this.block[4].component = {
			[0]: this.ap_pagos,
			//[1]: this.Bt_bor_asi_pag
		}

		this.block[5] = structuredClone(this.container)
		this.block[5].prop.Visible = false
		this.block[5].title = this.prop.Messages[12]
		this.block[5].style.width = 'fit-content';
		this.block[5].component = {
			[0]: this.captura_xml,
			//[1]: this.Bt_bor_asi_pag
		}

		this.block[6] = structuredClone(this.container)
		this.block[6].prop.Visible = false
		this.block[6].title = 'CFDI'
		this.block[6].style.width = 'fit-content';
		this.block[6].component = {
			[0]: this.report,
			//[1]: this.Bt_bor_asi_pag
		}

	}

	// tipo de captura, sistema de captura
	override async init() {
		let tip_cap = this.Params[0]
		let cod_nom = this.Params[1]
		this.tip_cap = tip_cap

		this.top_con = (iif(Public.value.ndb_emp == 4, ' limit 100', ' top 100'));
		let m = {}   // inicializamos m
		let result = []
		this.prop.tip_cap = tip_cap
		if (this.Params.length == 2) {
			this.cod_cap = cod_nom
		} // End If 

		let doc_dis = false
		// documentos de distribuidoras
		if (tip_cap == 'DI' || tip_cap == 'DE') {
			// this.do_nopagados.prop.Visible = false
			//this.La_do_nopagados.prop.Visible = false
			//this.La_apl_pagos.prop.Visible = false

			//this.Bt_doc_por_pagar.prop.Visible = false
			this.rfc_pve.prop.Visible = false
			// quita los objetos que no se utilizan en Cuentas por cobrar

			this.top_nom.prop.Visible = false

			this.Bt_carga_xml.prop.Visible = false
			this.d_sal_cta.prop.Caption = this.prop.Messages[0]  // this.traduce('Saldo caja chica')
			if (tip_cap == 'DI') {
				tip_cap = 'C'
				// Clientes
			} else {
				tip_cap = 'P'
				// Proveedores
			} // End If 

			this.prop.tip_cap = tip_cap
			// reasignamos el tipo de captura
			doc_dis = true
		} // End If 

		if (tip_cap == 'C') {

			if (doc_dis) {
				this.prop.Caption = this.prop.Messages[1]
				// imprime el titulo
			} else {
				this.prop.Caption = this.prop.Messages[2]
				// imprime el titulo
			} // End If 
			this.cod_nom.prop.Caption = this.prop.Messages[3]
			//   thisform.caption='Mantenimiento a cargos y abonos de clientes'    && imprime el titulo
			this.Bt_carga_xml.prop.Visble = false
			// deshabilitamos carga de xmls
			this.cod_nom.prop.InputMask = Public.value.icl_pge
		} else {

			this.prop.Help_url = 'help/Archivos/Ctas%20x%20pagar/Mantenimiento/Cargos%20y%20abonos/CARGOS%20Y%20ABONOS.html'
			if (doc_dis) {

				this.prop.Caption = this.prop.Messages[4]
				// imprime el titulo
			} else {

				this.prop.Caption = this.prop.Messages[5]
				// imprime el titulo
			} // End If 
			this.cod_nom.prop.Caption = this.prop.Messages[6]
			//   thisform.caption='Mantenimiento a cargos y abonos de proveedores'    && imprime el titulo
			this.Bt_carga_xml.prop.Visble = false
			// deshabilitamos cargar xmls

			// desaparecemos datos de vendedores
			//this.ven_ven.prop.Visible = false
			//this.com_doc.prop.Visible = false
			this.RemoveObject('ven_ven')
			this.RemoveObject('com_doc')

			this.cod_nom.prop.InputMask = Public.value.ipr_pge
		} // End If 

		// Set Null Off 

		if (this.Params.length == 2) {
			this.cod_nom.prop.Caption = '  '
		} // End If 

		//await use('vi_cap_comeunn', m) // use vi_cap_comeunn vi_cap_comeunn
		await SQLExec(`select des_unn,unn_unn from vi_cap_comeunn  UNION select 'TODAS' as des_unn,'   ' as unn_unn  order by des_unn `, 'vi_cap_comeunn')

		result = await SQLExec(`select OBJECT_ID('vi_cap_comepry', 'V') as result`)

		if (1 == 0 && result[0].result != null) {
			//			await useNodata('vi_cap_comepry') // use vi_cap_comepry vi_cap_comepry Nodata

		}
		else {
			this.RemoveObject('num_pry')
			this.RemoveObject('tpy_tpy')
			//	this.RemoveObject('num_pry')
		}

		/*
		await useNodata('lla1_cba') // use lla1_cba lla1_cba Nodata

		await useNodata('lla1_ven') // use lla1_ven lla1_ven Nodata
		//noupdate && tabla de vendedores
		await useNodata('vi_cap_comenom') // use vi_cap_comenom vi_cap_comenom Nodata
		//noupdate && tabla de clientes y proveedores
		await useNodata('lla1_mos') // use lla1_mos lla1_mos Nodata
		//noupdate && datos para clientes y proveedores de mostrador
		await useNodata('lla1_tdn') // use lla1_tdn lla1_tdn Nodata
		//noupdate  && tabla de tipos de clientes y proveedores
		
		*/

		let ins_sql = `select * ,\
           CASE when coa_tdo = 'C' then '${this.prop.Messages[9]}' else '${this.prop.Messages[7]}' end As afe_tdo \
		    From vi_cap_cometdo where (coa_tdo='C' or coa_tdo='A') AND cop_nom = '${tip_cap}' AND \
		   ${iif(doc_dis, 'nmo_tdo = 0', '0=0')} `   // nmo_doc= numero de movimientos 

		if (tip_cap == 'C') {
			/*
			let res = await localAlaSql(`INSERT INTO cometdo select * ,\
					 iif ( coa_tdo = 'C' , ${this.prop.Messages[9]}, iif ( coa_tdo = 'A' ,    ${this.prop.Messages[7]} , ${this.prop.Messages[8]} ) )  \
					 As afe_tdo From vi_cap_tdo where coa_tdo$'CA' AND cop_nom = tip_cap AND 
					 iif ( doc_dis , nmo_tdo = 0 , true ) Order By coa_tdo , des_tdo `)
			 */
			ins_sql += ` Order By coa_tdo ,tip_cfd desc, des_tdo `

			//NOFILTER READWRITE
		} else {
			ins_sql += ` Order By coa_tdo desc, des_tdo `
			/*let res = await localAlaSql(`INSERT INTO cometdo select * , \
					iif ( coa_tdo = 'C' , ${this.prop.Messages[9]} , iif ( coa_tdo = 'A' , ${this.prop.Messages[7]} ,  ${this.prop.Messages[8]} ) ) As afe_tdo From vi_cap_tdo where coa_tdo$'CA' AND cop_nom = tip_cap AND iif ( doc_dis , nmo_tdo = 0 , true ) Order By coa_tdo Desc , des_tdo `)
		   */
			//NOFILTER READWRITE
		} // End If 

		await SQLExec(ins_sql, 'cometdo')

		let cometdo = await goto(0, 'cometdo')

		this.tdo_tdo.prop.Value = cometdo.tdo_tdo
		this.tdo_tdo.prop.Value = 1

		// tabla de seguridad por grupos

		// await rev_seg_doc()
		// cambiamos por rutina de seguridad

		// vista de documentos para darle mantenimiento
		await useNodata('vi_cap_comedoc')

		// tabla de tipos de documentos a pagar
		await SQLExec(`select tdo_tdo , des_tdo From vi_cap_cometdo Where cop_nom='${tip_cap}' AND ( cop_nom + coa_tdo = 'CC' OR cop_nom + coa_tdo = 'PA' ) Order By des_tdo`, 'doc_ppagar')
		// vista de documentos para darle mantenimiento

		/* 
		// Remueve objeto si no existe la tabla de cuentas bancarias
		let cam_arc = afields()
		// Buscamos campo

		if (ascan(cam_arc, 'cba_cba') <= 0) {
			// cuentas bancarias
			this.RemoveObject('cba_cba')
			// removemos 
			this.RemoveObject('che_doc')
		} else {

			await useNodata('vi_cap_comecba') // use vi_cap_comecba vi_cap_comecba Nodata
			// vista de cuentas de cheque por cliente , proveedor o enpresa

		} // End If 
		*/

		await useNodata('lla1_seg') // use lla1_seg lla1_seg Nodata
		// vista de seguridad por grupos
		//await useNodata('vi_key_pag') // use vi_key_pag vi_key_pag Nodata
		// vista de revision de captura de pagos

		await useNodata('vi_cap_comedoc', 'doc_pagado') // use vi_cap_comedoc vi_cap_comedoc Nodata
		// vista de documentos pagados

		await useNodata('vi_cap_comepag') // use vi_cap_comepag vi_cap_comepag Nodata
		// vista de lectura y tabla de pagos

		await useNodata('lla1_pag', 'tabla') // use lla1_pag lla1_pag Nodata Alias
		// vista de pagos
		await useNodata('lla1_tdo') // use lla1_tdo lla1_tdo Nodata
		// vista de tipos de documentos


		//		this.prop.Messages[7] = 'Abono'
		//		this.prop.Messages[9] = 'Cargo'

		//this.d_coa_tdo.prop.Value = iif(cometdo.coa_tdo == 'C', this.prop.Messages[9], this.prop.Messages[7])
		await useNodata('lla1_xml') // use lla1_xml lla1_xml Nodata
		m.cam_sat = 'FPA_SAT'
		m.par_sat = '  '
		await use('vi_comesat', m, 'formas_pago') // use vi_comesat vi_comesat

		m.cam_sat = 'MPA_SAT'
		m.par_sat = '  '
		await use('vi_comesat', m, 'metodos_pago') // use vi_comesat vi_comesat

		m.cam_sat = 'USO_SAT'
		m.par_sat = '  '
		await use('vi_comesat', m, 'uso_sat') // use vi_comesat vi_comesat

		m.cam_sat = 'TRE_SAT'
		m.par_sat = '  '
		await use('vi_comesat', m, 'tipo_relacion') // use vi_comesat vi_comesat

		await useNodata('vi_cap_cometcd') // use vi_cap_cometcd vi_cap_cometcd Nodata

		const cam_arc = afields('vi_cap_cometcd')
		// Buscamos campo
		if (ascan(cam_arc, 'pga_pga') > 0) {
			// CONTROL DE PRESUPUESTO DE GASTO
			this.sw_pga = true
		} // End If 

		if (Public.value.pct_pct == 1 && this.prop.tip_cap == 'P') {
			// solo se habilita si esta activada la contabilidad y es cuentas
			// por pagar

			let res = await localAlaSql("INSERT INTO comedia select dia_dia , mon_dia From vi_cap_dia")
			//    * USE vi_cap_dia ALIAS comedia
			await select('comedia')
			await goto('TOP')
			await goto('BOTTOM')
			await useNodata('lla1_pvd') // use lla1_pvd lla1_pvd Nodata
			// proveedores que estan en contabilidad

			// provvedores varios en contabilidad
			this.d_sal_cta.prop.Visible = true
			//    cursorsetprop("Buffering",5)   && Bloqueo optimista por tabla
			this.d_sal_cta.prop.Visible = true


		} else {

			this.d_sal_cta.prop.Visible = false
			this.d_sal_cta.prop.Visible = false
			this.RemoveObject('rfc_pve')
			// quita los objetos que no se utilizan en Cuentas por cobrar

			let sw_rmv = true
			// WAIT windows 'abriendo vistas' TIMEOUT 1
		} // End If 
		await localAlaSql('CREATE TABLE IF NOT EXISTS now.vcomesal (tdo_tdo CHAR(3),des_tdo CHAR(16),ndo_doc NUMERIC(8),ref_doc CHAR(40),fec_doc DATE (8),fve_doc DATE (8),sal_doc NUMERIC(19,5),dmo_doc CHAR(3),pag_doc NUMERIC(19,5))')

		m.nom_tab = this.prop.Name
		m.par_dxm = ''
		await use('vi_cap_comedxm', m) // use vi_cap_comedxm vi_cap_comedxm

		if (await recCount() > 0) {
			// VFP LOCATE For var_dxm='lim_inf_sal'
			result = await locateFor(` var_dxm='lim_inf_sal'`)

			if (result.length > 0) {
				this.lim_inf_sal = result[0].val_dxm
				// limite inferior
			} // End If 

			// VFP LOCATE For lower(var_dxm)='top_con'
			// top de consulta en vcomesal
			result = await locateFor(` lower(var_dxm)='top_con'`)

			if (result.length > 0) {
				this.top_con = result.val_dxm
			} // End If 

			// VFP LOCATE For lower(var_dxm)='val_che_doc'
			// top de consulta en vcomesal
			result = await locateFor(` lower(var_dxm)='val_che_doc'`)

			if (result.length > 0) {
				this.val_che_doc = result.val_dxm
			} // End If 

			// VFP LOCATE For var_dxm='con_vcomesal'
			// top de consulta en vcomesal
			result = await locateFor(` var_dxm='con_vcomesal'`)

			if (result.length > 0) {
				this.con_vcomesal = result.val_dxm
			} // End If 

		} // End If 

		m.par_dxm = tip_cap
		// por tipo de captura C=cliente o P=Proveedor
		await use('vi_cap_comedxm', m) // use vi_cap_comedxm vi_cap_comedxm

		if (await recCount() > 0) {
			// VFP LOCATE For upper(var_dxm)='DCA_PAG'
			// decimales de captura para pagos
			let records = await locateFor(` upper(var_dxm)='DCA_PAG'`)

			if (found()) {
				this.dca_pag = val(val_dxm)
			} // End If 

		} // End If 

		this.ap_pagos.c_mon_pag.prop.InputMask = '99,999,999.' + replicateString('9', this.dca_pag)
		this.ap_pagos.c_mon_pag.prop.Decimals = this.dca_pag
		/*		
				let nom_cur = 'pgexml'
				//// obtenemos datos xml de comepge
				m.nom_tab = 'comepge'
				m.key_xmd = 1
		
				const comexmd = await use('lla1_xmd', m)
		
				if (comexmd && comexmd.length > 0 && allTrim(comexmd[0].xml_xmd) > ' ') {
					xmlToCursor(comexmd[0].xml_xmd, nom_cur)
				}
		   */
		await super.init()
	}   // Fin Procedure
	//RETURN DODEFAULT('comenom')


	// Evento  :grabar
	// Objeto  :come1103
	// Tipo   :Form
	// Comentarios :Pertenece a la forma principal de captura
	override async grabar(sw_rel: any) {

		if (!await super.grabar())
			return

		let m = {}   // inicializamos m
		let sw_del = false
		if (this.prop.key == 27) {
			// es salida sin grabar
			return

		} // End If 

		const vi_cap_comedoc = await select('vi_cap_comedoc')

		// seleccionamos la vista

		m = appendM(m, vi_cap_comedoc)     // appendM(m, await scatter())// scatter 
		/*
				sw_del = Deleted()
				for (const Control of this.main) {
		
					if (substr(Control.prop.Name, 4, 1) == '_' && upper(left(Control.prop.ControlSource, 11)) == 'vi_cap_comedoc') {
						if (Control.prop.Valid == false) {
							Control.valid(sw_rel:boolean)
							// buscamos controles no validados
							if (Control.prop.Valid == false) {
								// revizamos si es buena la validación
								return false
		
							} // End If 
		
						} // End If 
		
					} // End If 
		
				} // End For; 
		*/

		// importe actual del documento

		let imp_act = this.im0_doc.prop.Value + this.im1_doc.prop.Value + this.im2_doc.prop.Value + this.im3_doc.prop.Value + this.im4_doc.prop.Value + this.im5_doc.prop.Value
		if (this.sw_pga && len(rTrim(this.tcd_tcd.prop.Value)) > 0 && len(vi_cap_cometcd.pga_pga) > 0) {
			// Inicio replace VFP
			const Recno = await recNo()
			const Alias = await alias()
			await localAlaSql(`update ${Alias} set pga_pga=?  where recno=${Recno} `, [vi_cap_cometcd.pga_pga])
			// asignamos presupuesto de gasto

		} // End If 

		if (this.vi_cap_comedoc.key_pri) {
			let tdo_tdo = this.tdo_tdo.prop.Value
			// se asigna ya que el source del control es nulo
			let ndo_doc = this.ndo_doc.prop.Value
			// se asigna ya que el source del control es nulo
			let sal_doc = 0
			// saldo del documento
			//	let imp_ant = 0

			const Recno = await recNo()
			const Alias = await alias()
			await localAlaSql(`update ${Alias} set cop_nom=?  where recno=${Recno} `, [this.prop.tip_cap])
			// asignamos el tipo de cliente o proveedor

		} else {
			// obtiene los datos viejos

			const dataOld = await goto(0, 'vi_cap_comedoc', true)
			let sw_cambio = false
			for (const field of dataOld)
				if (vi_cap_comedoc[field] != dataOld[field]) {
					sw_cambio = true
					break
				}

			if (!sw_cambio) {
				// si no hay cambios de valor
				return true
				// sale sin actualizar

			} // End If 

			// calcula el saldo por documento
			//	imp_ant = await oldValue('imp_doc', 'vi_cap_comedoc') + await oldValue('im0_doc', 'vi_cap_comedoc') + await oldValue('im1_doc', 'vi_cap_comedoc') + await oldValue('im2_doc', 'vi_cap_comedoc') + await oldValue('im3_doc', 'vi_cap_comedoc') + await oldValue('im4_doc', 'vi_cap_comedoc') + await oldValue('im5_doc', 'vi_cap_comedoc')

		} // End If 

		let sw_asi = false


		//	await select('vi_cap_comedoc')


		////////////////////
		//SQLExec(num_dbs,'BEGIN TRANSACTION') && comenzamos la transaccion

		// switch de asignación
		while (! super.xml('El documento')) {
			// rutina general de grabación
			if (Public.value.num_err != 2601) {
				// si alguien lo dio de alta primero
				return false

			} // End If 
			if (sw_asi || MessageBox("Se asigna un nuevo número de documento ", 4 + 32) == 6) {

				MessageBox('Asignando nuevo número')

				this.ndo_doc.prop.Value = get_con_doc(this.tdo_tdo.prop.Value)
				// asigna nuevo consecutivo
				// this.ndo_doc.Refresh
				await select('vi_cap_comedoc')
				// seleccionamos la vista

				// Inicio replace VFP
				const Recno = await recNo()
				const Alias = await alias()
				await localAlaSql(`update ${Alias} set ndo_doc=?  where recno=${Recno} `, [this.ndo_doc.prop.Value])

				sw_asi = true
			} // End If 
		} // End while 

		m = appendM(m, await scatter())// scatter 

		//		await select('vi_cap_comedoc')
		// graba campos xml   && solamente si no es un campo nuevo
		if (vi_cap_comedoc.key_pri && this.sw_xml) {
			// hay campos xml
			this.captura_xml.graba_xml('COMEDOC', vi_cap_comedoc.key_pri)
		} // End If 
		// Proveedores varios
		if (this.prop.tip_cap == 'P' && View['lla1_pve']) {
			const lla1_pve = await goto(0)
			// si es proveedores y esta conectado a contabilidad

			if (sw_del) {  // proveedores varios
				// si es borrado de documento

				await deleteSqlRow('lla1_pve')
				await select('lla1_pvd')
				await requery(m, 'lla1_pvd')
				/*
								if (await recCount() > 0) {
									await deleteLocalSql()
				
									await tableUpdate(0,false,'lla1_pvd')
				
								} // End If 
				*/

			} else {

				// si es una alta
				if (await recNo() < 0 && lla1_pve.rfc_pve > '   ') {
					// tiene rfc y es nuevo
					if (!tableUpdate(0, false, ' lla1_pve')) {
						MessageBox('No se pudo grabar datos del proveedor en contabilidad', 16, 'Error', 3000)
						return false

					} // End If 

				} // End If 
				const vi_cap_comenom = await goto(0, 'vi_cap_comenom')
				m = appendM(m, await scatter())// scatter 
				//await select('lla1_pvd')
				const lla1_pvd = await requery(m, 'lla1_pvd')
				// no esta en la tabla no tiene rfc en el catalogo de nombres y si tiene rfc capturado

				if (await recCount('lla1_pvd') == 0 && lla1_pve.rfc_pve > '   ' && lla1_pve.rfc_pve != vi_cap_comenom.rfc_nom) {
					await appendBlank()
					// incertamos registro
					await gatherFrom(m)
					await tableUpdate(0, false, lla1_pve)

				} else {

					if (await recCount('lla1_pvd') > 0 && lla1_pvd.rfc_pve != m.rfc_pve) {
						// si tiene registro en proveedores
						// Inicio replace VFP
						const Recno = await recNo()
						const Alias = await alias()
						await localAlaSql(`update ${Alias} set rfc_pve=?  where recno=${Recno} `, [m.rfc_pve])
						await tableUpdate(0, false, 'lla1_pvd')

					} // End If 

				} // End If 

			} // End If 

		} // End If 


		this.Bt_observaciones.prop.Visble = true
		// llama al programa de gastos

		return true
	}   // Fin Procedure

	// Graba los datos de un documento despues de una captura o medificacion
	// Evento   :gra_doc
	// Objeto  :gra_doc
	// Tipo   :Metodo
	// Comentarios :Graba los datos de un documento despues de una alta o actualizacion
	override async bt_saveClick() {
		const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
		if (vi_cap_comedoc.imp_doc == 0 &&
			vi_cap_comedoc.im0_doc == 0 &&
			vi_cap_comedoc.im1_doc == 0 &&
			vi_cap_comedoc.im2_doc == 0 &&
			vi_cap_comedoc.im3_doc == 0 &&
			vi_cap_comedoc.im4_doc == 0 &&
			vi_cap_comedoc.im5_doc == 0) {

			MessageBox(this.prop.Messages[13], 48, 'Error', 3000)
			return
		}

		if (!await super.bt_saveClick()) // no se grabaron los datos
			return
		this.Form.ndo_ndo.valid()

	}   // Fin Procedure

	/*
		// Evento   :KeyPress
		// Objeto  :come6101
		// Tipo   :Form
		// Comentarios :Pertenece a la forma principal de captura
		override async keyPress(nKeyCode: any, nShiftAltCtrl: any) {
			let m = {}   // inicializamos m
			this.prop.key = nKeyCode
			if (this.prop.key == 27) {
				// si da un "ESC" se sale de la forma
	
				// si esta capturando el número de documento
				if (await recCount('vi_cap_comedoc') <= 0) {
					//(.not. thisform.ndo_doc.readonly .or. thisform.tdo_tdo.enabled) .and. thisform.cod_nom.readonly
					this.salir.click
					// se sale
				} else {
	
					this.otroClick()
					// si no, unicamente pide otro codigo
				} // End If 
	
			} // End If 
	
			if (nkeycode == 3 && this.ndo_doc.prop.ReadOnly) {
				// si da pagina abajo
			} // End If 
			// thisform.otro.click()
			// thisform.tdo_tdo.setFocus()
	
			return
	
		}   // Fin Procedure
	*/
	/*
		// Revisa permisos de usuarios de utilizacion de un objeto
		// Metodo  :rev_per
		// Pertenece :COME5101
		// Comentarios : Reviza prmisos de seguridad
		async rev_per(nom_cam: string, sw_mov: any) {
	
			let m = {}   // inicializamos m
			if (this.Params.length == 1) {
				let sw_mov = false
			} // End If 
	
			if (Public.value.log_usu == ('ADMIN')) {
				return true
			} // End If 
	
			const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')
			// si encuentra el campo
			if (this.nom_obj[nom_cam] == '1' || this.nom_obj[nom_cam] == '3') {
				// permite Modifica o Captura y modifica
				return true
	
			} // End If 
	
			// reviza si se permite la captura
			if (this.nom_obj[nom_cam] >= '2' && ((!sw_mov && vi_cap_comedoc.key_pri) || (sw_mov && this.num_mov == 0))) {
				return true
	
			} // End If 
	
	
			// si permite la captura es impresión pero no se a impreso ni timbrado
			if (this.nom_obj[nom_cam] == '2' && nom_cam == 'IPR' && vi_cap_comedoc.sta_doc != 'I' && vi_cap_comedoc.sta_doc != 'T') {
				return true
	
			} // End If 
	
	
			return false
	
		}   // Fin Procedure
	*/

	// Evento   :bt_modifyClick
	// Objeto  :bt_modify
	// Tipo   :Button
	// Comentarios :Se cambia del original y permite captura de datos segun los datos del documento
	override async bt_modifyClick(swm?: boolean) {
		this.Form.Bt_campos_xml.prop.Visible = true
		let m = {}
		m = await goto(0, 'vi_cap_comedoc')

		// checa si tiene movimientos 
		const res = await SQLExec(`select CAST(count(man_comemov.key_pri) as int) as num_mov,max(sta_doc) as sta_doc from man_comedoc 
			 left outer join man_comemov on man_comemov.tdo_tdo=man_comedoc.tdo_tdo and man_comemov.ndo_doc=man_comedoc.ndo_doc where man_comedoc.tdo_tdo='${m.tdo_tdo}' and man_comedoc.ndo_doc=${m.ndo_doc}`)

		if (!res[0]) {
			this.Form.ndo_doc.setFocus()
			return
		}
		// si es un documento con movimietos o esta timbrado, cancelado o en proiceso de timbrado

		if (res[0] && (res[0].num_mov > 0 ||
			res[0].sta_doc == 'T' ||
			res[0].sta_doc == 'C' ||
			res[0].sta_doc == 'N' ||
			res[0].sta_doc == 'X') || !res[0]) {
			MessageBox(this.prop.Messages[14], 49, 'Warning', 3000)
			this.bt_modify.prop.Visible = false
			this.bt_delete.prop.Visible = false;
			// this.Bt_cancel.prop.Visible = true
			return
		}
		this.num_mov = res[0].num_mov
		await super.bt_modifyClick()
		const cometdo = await goto(0, 'cometdo')

		// Datos XML
		this.block[5].prop.Visible = false

		this.Do_nopagados.prop.ReadOnly = true
		this.ap_pagos.prop.ReadOnly = false
		this.bt_delete.prop.Visible = true;
		this.bt_save.prop.Visible = true
		const vi_cap_comedoc = await goto(0, 'vi_cap_comedoc')

		this.cod_nom.lee_tdn()

	}   // Fin Procedure


	async otroClick(sw_rel) {
		let m = {}   // inicializamos m
		if (await recCount('vi_cap_comepag') > 0) {
			// reviza si tiene abierta la vista de captura de pagos
			await select('vi_cap_comepag')

			if (await recNo('vi_cap_comepag') < 0) {
				// si no hay pagos
				await tableRevert()

			} // End If 

			await select('vi_cap_comepag')

			m = appendM(m, await scatterBlank(m))// scatter 

			this.ap_pagos.prop.RecordSource = ''
			// pone en nulos el record source
			await useNodata('vi_cap_comepag') // use vi_cap_comepag vi_cap_comepag Nodata
			// abre la vista sin datos

		} // End If 

		await select('vcomesal')
		await localAlaSql('delete from now.vcomesal')
		await localAlaSql('delete from Last.vcomesal')
		/*
		if (await recCount() > 0) {
			await deleteLocalSql(ALL)
	
			await tableUpdate()
			   Zap
		    
		} // End If 
		*/

		await select('vi_cap_comedoc')
		//on key label CTRL+del     && desactivamos la funcion deborrado

		if (await recCount() > 0 && await !this.grabar(sw_rel)) {
			// corre rutina de aceptacion de datos
			MessageBox('La información no fuÃ© grabada')
			await select('vi_cap_comedoc')
			// si el registro no es nuevo trae los datos actualizados

			await tableRevert()


			//.not. thisform.vi_cap_comedoc.key_pri .and.
			if (!sw_rel) {
				// si no es un relase
				this.ndo_doc.setFocus()
				//      thisform.refresh
				return false
				// regresa a la forma

			} // End If 


			// si es un codigo nuevo y no es release
			if (sw_rel) {
				// si se llamo del objeto desde release
				if (!this.ndo_doc.prop.ReadOnly) {
					releaseUse() // use 

					return false

				} // End If 

				let sw_rel = false
			} // End If 

		} // End If 

		if (await recCount('vi_cap_comedoc') > 0) {
			await select('vi_cap_comedoc')

			m = appendM(m, await scatter())// scatter 

			if (await recCount('vi_cap_cometcd') > 0) {
				// si hay clasificacio de documentos
				const cam_arc = afields()

				// Buscamos campo
				if (ascan(cam_arc, 'PRG_PRG') > 0 && pry_pry == 'S') {
					// si es con control de proyectos
					m = appendM(m, await scatter())// scatter 

					if (len(allTrim(m.prg_prg)) > 0) {
						// si va a llamar a un progama de asignacion de gasto
						let men_err = ''
						m.prg_prg = allTrim(m.prg_prg) + ' with ' + m.par_prg
						let ins_fox = 'Do Form ' + allTrim(m.prg_prg) + ' To men_err'
							& ins_fox
						if (len(allTrim(men_err)) > 10) {
							MessageBox(men_err, 16, 'Error')
						} // End If 

					} // End If 

				} // End If 

			} // End If 

		} // End If 

		await select('vi_cap_comenom')

		await useNodata('vi_cap_comenom') // use vi_cap_comenom vi_cap_comenom Nodata

		await select('lla1_ven')

		await useNodata('lla1_ven') // use lla1_ven lla1_ven Nodata

		await select('vi_cap_comedoc')
		// volvemos a traernos la vista sin datos

		await useNodata('vi_cap_comedoc') // use vi_cap_comedoc vi_cap_comedoc Nodata

		if (!sw_rel) {
			// si no se llamo desde el release
			this.SetAll('Readonly', true)
			// Ponemos de solo lectura los controles
			this.mon_doc.prop.Visble = false
			// Deshabilitamos la moneda del docto
			//	this.d_tot_doc.prop.Value = 0 // total por documento

			this.d_sal_doc.prop.Value = 0 	// saldo
			// this.d_pap_doc.prop.Value = 0 // por aplicar


			// tipo de documento ponemos en captura
			this.tdo_tdo.prop.ReadOnly = false
			// tipo de documento ponemos en captura
			this.ndo_doc.prop.ReadOnly = false
			// número de documento ponemos en captura
			// this.Bt_apl_pag.prop.Visble = false
			// deshabilitamos los bottones de mantenimiento
			this.bt_delete.prop.Visble = false
			//this.modificar.prop.Visble = false

			this.block[5].prop.Visible = false
			// this.captura_xml.prop.Visible = false
			// this.co_apl_pagos.prop.Visible = true
			// this.block[4].prop.Visible = true
			//this.la_apl_pagos.prop.Visible = true
			this.ap_pagos.prop.Visible = true
			this.ap_pagos.prop.Visble = false
			this.Bt_observaciones.prop.Visble = false
		} // End If 


		// actualiza la tabla en el grid
		this.tdo_tdo.setFocus()
		this.Refresh
		//thisform.tdo_tdo.valid()
		//thisform.ndo_doc.setFocus()
		return

	}   // Fin Procedure


	/*
		public Salir = class {
			override async keyPress(nKeyCode: any, nShiftAltCtrl: any) {
				let m = {}   // inicializamos m
				if (nkeyCode == 9) {
					this.tdo_tdo.setFocus()
				} // End If 
	
			}   // Fin Procedure
	
			//Salir
		}
		*/

	override async bt_deleteClick() {

		let m = {}
		m = await goto(0, 'vi_cap_comedoc')

		// checa si tiene movimientos 
		const res = await SQLExec(`select CAST(count(man_comemov.key_pri) as int) as num_mov,max(sta_doc) as sta_doc from man_comedoc 
			 left outer join man_comemov on man_comemov.tdo_tdo=man_comedoc.tdo_tdo and man_comemov.ndo_doc=man_comedoc.ndo_doc where man_comedoc.tdo_tdo='${m.tdo_tdo}' and man_comedoc.ndo_doc=${m.ndo_doc}`)

		// si es un documento con movimietos o esta timbrado, cancelado o en proiceso de timbrado

		if (!res[0]) {
			this.Form.ndo_doc.setFocus()
			return
		}

		if (res[0] && (res[0].num_mov > 0 ||
			res[0].sta_doc == 'T' ||
			res[0].sta_doc == 'N' ||
			res[0].sta_doc == 'X') || !res[0]) {
			MessageBox(this.prop.Messages[15], 49, 'Warning', 3000)
			this.bt_modify.prop.Visible = false
			this.bt_delete.prop.Visible = false;
			// this.Bt_cancel.prop.Visible = true
			return
		}

		if (await super.bt_deleteClick()) {
			this.captura_xml.borra_xml()

			return true
		}
		return false

	}
	//metodo
}

