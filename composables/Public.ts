/*
    * Composable to manage public variable values in a Vue.js application.
    * This variables includes general parameters, user/session information, and other configurations.
*/
const state = reactive({
    Public: {
        Company: "",
        User: "",
        token: "",
        // General parameters
        nem_pge: "", grl_pge: "", tii_pge: "", ima_pge: "", uac_pge: "", fpo_pge: "",
        an1_pge: "", an2_pge: "", an3_pge: "", tiv_pge: "", fde_pge: "", ine_pge: "",
        ctc_pge: "", ctp_pge: "", dct_pge: "", mos_pge: "", pva_pge: "",
        li1_pge: "", li2_pge: "", li3_pge: "", li4_pge: "", li5_pge: "", // impuestos
        cl1_sat: "", cl2_sat: "", cl3_sat: "", cl4_sat: "", cl5_sat: "", // claves de impuesto segun el sat
        po1_pge: 0, po2_pge: 0, po3_pge: 0, po4_pge: 0, po5_pge: 0, // porcentajes de vendedores
        cpa_pge: "", cdi_pge: "", va1_pge: "",
        va2_pge: "", va3_pge: "", va4_pge: "", va5_pge: "", de1_pge: "", de2_pge: "",
        de3_pge: "", de4_pge: "", de5_pge: "", pr1_pge: "", pr2_pge: "", pr3_pge: "",
        pr4_pge: "", di0_pge: "", di1_pge: "", di2_pge: "", di3_pge: "", di4_pge: "", di5_pge: "", itr_pge: "",
        vi1_pge: "", vi2_pge: "", vi3_pge: "", pol_pge: "", suc_pge: "",
        dcp_pge: "", dci_pge: "", pgi_pge: "", coc_pge: "", cpr_pge: "",
        pap_pge: "", pac_pge: "", dbl_pge: "", inm_pge: "", pmv_pge: "",
        dec_pge: "", tip_pge: "",
        dpm_pge: "", mpv_pge: "", rfc_pge: "",
        cal_pge: "", ext_pge: "", int_pge: "", col_pge: "", loc_pge: "", mun_pge: "", edo_pge: "", cpo_pge: "",
        nru_pge: "",
        rfi_pge: "", rfi_sat: "", icl_pge: "", ipr_pge: "", ipg_pge: "", gnl_pge: "",
        rol_pge: "",
        tel_pge: "", mai_pge: "",
        gln_pge: "",
        aju_hor: "", // Ajuste de horario

        // User/session
        usu_usu: "", log_usu: "", pas_usu: "", nom_usu: "", gru_gru: "", alm_usu: "", usu_act: "", num_usu: 0,
        dpm_usu: "", pmv_usu: "", usu_alm: "",
        dat_ses: "",
        dir_emp: "", sql_emp: "", dbs_emp: "",

        // Moneda arrays
        val_mon1: [1, 0, 0, 0, 0],
        des_mon1: ["MXN", "", "", "", ""],
        pro_mon1: ["M.N.", "", "", "", ""],
        dec_mon1: ["", "", "", "", ""],

        // Impuestos arrays
        des_imp1: ["", "", "", "", "", ""],
        val_imp1: ["", "", "", "", "", ""],

        // Database and security
        num_dbs: 0, // número de coneccion hacia la base de datos
        bas_dat: "",
        nom_emp: "", dir_emp2: "", suc_emp: "", ndb_emp: 1, cmp_seg: "NDO,REF,COD,CON,VEN,MON,VMO,FEC,FVE,ALS,ALE,MOV,DPE,CLA,PED,SER,CAN,UNI,PVE,DES,IPR,CNC,BOR,IPS,OBS,PAR,IMP,BDO,MOD,TCD,SUC,CEN,CBA,CHE,NPA,MPA,FPA,USO,TRE,TDR,TPA,RPA,FIP,IM0,IM1,IM2,IM3,IM4,IM5",
        pct_pct: 0,
        dir_cfd: "",
        // Variables para ubicar posicion de la familia para obtener descuentos
        pri_fam: 1, ult_fam: 19, pri_cla: 1, ult_cla: 19, sucursal: "   ",
        key: 0, // tecla que se presiona
        num_err: 0, // número de error

        // Meses
        mes: [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ],

        // Otros
        help_url: "", servidor_url: "", sw_imp: false, //,sw_impuesto
        lan_lan: "", // Lenguaje del frontend
    },
})


export const Public = computed(() => {
    const { Public } = toRefs(state)
    return Public.value
})
