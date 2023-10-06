// index.ts
/* en nuxt.config.ts (dio error al arrancar)
modules: [
  '@pinia/nuxt'
  
,
        {
            autoImports: [
              // automatically imports `defineStore`
              'defineStore' // import { defineStore } from 'pinia'
            ]
          }
        ]
*/

//import { defineStore, acceptHMRUpdate } from 'pinia'
import { acceptHMRUpdate } from "pinia";

//import {watch} from 'vue'
import axios from "axios";
import { io } from "socket.io-client";
import dat_emp from "/src/empresas/datos.json";
//import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
//import store from '../stores/index'
/*

// make sure to pass.value the right store definition, `Session` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot))
}
*/

export const Session = defineStore(
  "currentSession",
  () => {
    const id_con = ref("");
    const user = ref("");
    const pass = ref("********");
    const nom_emp = ref("");
    const url = ref("");
    const dialect = ref("Postgres");
    const fpo_pge = ref(new Date().toDateString());
    const logoEmp = ref("");
    const fileLogoEmp = ref(null);
    const Var = ref(0);
    const menu = ref([]);
    let socketIo: any;
    let socketId: string;

    // actions: { // aqui van todas las funciones que uno defina

    async function openSocket(password:string) {
      let urlSocket = url.value;
      const lon = urlSocket.length;
      urlSocket = urlSocket.slice(0, lon - 1);

      //const socket= new io()
      const json = {
        nom_emp: nom_emp.value,
        user: user.value,
        pass: password,
      };

      console.log("Socket url=>>>>>>>>>>>>>>>>", urlSocket, "json=", json);

      //    console.log('Conexion Axios==>>', url.value, json)
      if (socketIo) {
        socketIo.disconnect();
        console.log("=========Socket Disconnect====================");
      }

      socketIo = io(urlSocket, {
        auth: { 
          nom_emp: nom_emp.value,
          user: user.value,
          pass: password,
         },
      });
      socketId = socketIo.id;

      socketIo.on("loginFail", (res: string) => {
        MessageBox(res, 16, "SQL Error ");

        console.log("Socket loginFail res=", res);
      });

      socketIo.on("loginOk", async (res: {}) => {
        //res={ id: name, dialect: options.dialect, fpo_pge }

        id_con.value = res.id;
        fpo_pge.value = await stringToDate(res.fpo_pge);
        dialect.value = res.dialect;
        console.log("Socket Connection sucefully id=", socketId);
      });

      socketIo.on("fail", () => {
        socketIo.disconnect();
      });

      socketIo.on("broadcast", (res: []) => {});
    }

    function disconnect() {
      if (socketIo) {
        socketIo.disconnect();
      }
    }

    function sendMessage(req: {}) {
      socketIo.emit(req.msg, req.data);
    }

    /// /////////////  open  ///////////////////
    // Hace la conexion al servidor NODEJS que
    // comunica con el servidor de SQL
    /// ////////////////////////////////////////
    async function open(password: string) {
      //  let url: any = this.url
      const router = useRouter();
      if (
        nom_emp.value.length == 0 ||
        user.value.length == 0 ||
        password.length == 0
      ) {
        router.push("/Login");
        return;
      }

      try {
        url.value = dat_emp[nom_emp.value].url; // obtenemos el url del servidor node
        logoEmp.value = dat_emp[nom_emp.value].logoEmp;
      } catch (error) {
        console.warn("No existe empresa ", nom_emp.value);
        MessageBox(
          "No esta definida la empresa :" + nom_emp.value,
          16,
          "SQL Error "
        );
      }
      let sw_con = false;
      if (id_con.value.length > 8) sw_con = true;

      const def_con = {
        nom_emp: nom_emp.value,
        user: user.value,
        pass: password,
      };

      const json = JSON.stringify(def_con);

      const con = openSocket(password);
      return;

      /*
      try {
        let urlSocket = url.value;
        const lon = urlSocket.length;
        urlSocket = urlSocket.slice(0, lon - 1);

        console.log("Socket url=", urlSocket);
        //const socket= new io()
        const socket = io(urlSocket); // conecta con el servidor

        socket.on("loginOk", (data) => {
          console.log("Socket respuesta=", data);
        });

        //socket.emit('login',json)
        console.log("Socket IO=", socket);
        //  socketIo.value=socket
      } catch (error) {
        console.log("Socket Error=", error);
        //  return
      }
      */
      try {
        let response = await axios.get(
          url.value + "login?json=" + json
          // { headers: { "Content-type": "application/json" } }
        );

        if (response.data.fpo_pge)
          fpo_pge.value = await stringToDate(response.data.fpo_pge);

        dialect.value = response.data.dialect;
        id_con.value = response.data.id; // asignamos a su conexion de base de datos
        //fileLogoEmp=response.data.fileLogoEmp

        console.log(
          "Pinia ID de conexion=",
          id_con.value,
          "dialect",
          dialect.value
        );
        if (sw_con) return;

        window.history.back(); // regresa forma anterior
        //     const router = useRouter()
        //     router.push('/')
      } catch (error) {
        console.warn("Error llamada Axios", error);
        //const { $MessageBox } = useNuxtApp()

        if (error == "Network Error. Posible Db Server internet fail") {
          console.log("OpenDb Error SQL===>", error);
          MessageBox(error, 16, "SQL Error ");
        }

        // console.log('OpenDb error ===>',error.response.status.toString() + " " + error.response.statusText)
        if (error) {
          let menError = "";

          if (error.response) {
            if (error.response.statusText) menError = error.response.statusText;
            else menError = error.response;

            MessageBox(menError, 16, "ERROR");
            console.log("Pinia error ====>>>>>>", error.response);
            //  MessageBox(error.response.status.toString() + ' ' + error.response.statusText, 16, 'Data SQL Error')
          } else {
            MessageBox("Back-end comunication error", 16, "ERROR");
          }
        } else {
          console.warn("BackEnd error", error);
          MessageBox(error, 16, "ERROR");
        }
        pass.value = "";
      } // Fin de Catch
    }

    /// ////////////////////////////////
    // lee el Menu de la empresa
    // comunica con el servidor de SQL
    /// ////////////////////////////////////////
    async function leeMenu() {
      //  sin no se ha inicilizado la conexion aborta todo

      if (id_con.value == "") {
        const router = useRouter();
        router.push("/Login");
        return;
      }

      // const nom_emp.value :any= Storage.getItem("nom_emp.value");

      // const url = url // obtenemos el url del servidor node

      const dat_vis = {
        id_con: id_con.value,
        tip_llamada: "SQLEXEC",
        // tok_aut: this.tok_aut,
        query: "SELECT * from vcomeprg order by NUM_PRG,SIS_SIS,TPR_PRG",
      };

      try {
        const response = await axios.post(url.value + "sql", dat_vis, {
          headers: { "Content-type": "application/json" },
        });

        var data = [];

        for (let i = 0; i < response.data.length; i++) {
          const registro = {};
          for (const nom_cam in response.data[i]) {
            registro[nom_cam.toLowerCase()] = response.data[i][nom_cam];
          }
          data.push(registro); //  asigna todos los datos de cada opcion del menu

          const pre = data[i].tpr_prg === "S" ? "" : "-";
          let des_prg = data[i].des_prg.replace(String.raw`\<`, "");
          des_prg = des_prg == null ? "" : des_prg;
          data[i].des_prg = pre + des_prg;

          // response.data[i].des_prg = pre + response.data[i].des_prg.replace(String.raw`\<`, '')
        }
        //const menu = JSON.stringify(response.data)
        menu.value = data;
        console.log("Pinia ======leeMenu=====", menu.value, logoEmp.value);
      } catch (error) {
        console.log("Read Menu ", " Error", error);
        MessageBox(error.toJSON(), 16, "Back-End error ");
        const router = useRouter();
        router.push("/Login");
        return;
        // si no es un error de desconexion
      }

      dat_vis.query = " select * from publicvar";

      try {
        const result = await axios.post(url.value + "sql", dat_vis);
        console.log("Pinia Var=", Var.value);
        if (result.data) {
          Var.value = result.data[0];
          for (const comp in Var.value) {
            if (typeof Var.value[comp] == "string") {
              const Variable = Var.value[comp];
              // Checa si es una fecha

              if (
                typeof Variable == "string" &&
                +Variable.slice(0, 4) >= 1900 &&
                +Variable.slice(0, 4) <= 2100 &&
                Variable.slice(4, 5) == "-" &&
                +Variable.slice(5, 7) > 0 &&
                +Variable.slice(5, 7) < 13 &&
                Variable.slice(7, 8) == "-" &&
                +Variable.slice(8, 10) > 0 &&
                +Variable.slice(8, 10) < 32 &&
                Variable.slice(10, 11) == "T"
              ) {
                Var.value[comp] = Variable.substring(0, 10); //   replace('T',' ') // Quitamos la T

                //        Var.value[comp]=await stringToDate(Variable)
              }
            }
          }
          console.log("Store publicVar Var.value=", Var.value);
          console.log("Pinia Var=", Var.value);
        }
      } catch (error) {
        console.warn("Can't read view publicvar", error);
      }
    }
    //////////////////////////////////

    function logout() {
      $reset(); //  resetea lo valores a originales
      // desde la aplicacion haria lo mismo session.$reset()
      router.push("/");
    }

    function updateMenu(menuObt: any[]) {
      menu.value = menuObt;
    }

    watch(
      () => nom_emp.value,
      (new_emp, old_val) => {
        if (new_emp != old_val) {
          id_con.value = "";
          //  menu.value = []
        }
        console.log("Watch Pinia nom_emp.value", new_emp, id_con.value); // doest not do anything
      },
      { deep: false }
    );

    watch(
      () => id_con.value,
      (new_id, old_val) => {
        if (new_id != old_val) {
          console.log(
            "Watch Pinia id_con.value=",
            new_id,
            "nom_emp=",
            nom_emp.value
          ); // doest not do anything
          if (new_id.length > 9 && nom_emp.value.length > 2) leeMenu();
          else menu.value = [];
        }
      },
      { deep: false }
    );

    watch(
      () => pass.value,
      (new_pass, old_val) => {
        if (new_pass == "") return;

        const password = new_pass;
        if (password.length > 3 && user.value.length > 0) {
          pass.value = "";
          open(password);
        }
      },
      { deep: false }
    );

    const doneMenu = computed(() =>
      menu.value.filter((menu) => menu.value.done)
    );

    return {
      id_con,
      nom_emp,
      user,
      pass,
      menu,
      url,
      dialect,
      fpo_pge,
      logoEmp,
      doneMenu,
      Var,
      socketIo,
      fileLogoEmp,
    };
  },
  {
    //    persist: { storage: persistedState.localStorage, },
    persist: { storage: persistedState.sessionStorage },
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(Session, import.meta.hot));
}

/* puede utilizar watch'ers 
 pude ser reactiva
 desde la aplicacion cse puede actualizar todos los valores desde el obejo
   session.$patch({ id_con.value: '',
      user.value: '',
      nom_emp.value: '',
      url: '',
      menu: []})

   
 */
