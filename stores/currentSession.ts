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


//import axios from "axios";

import { Socket, io } from "socket.io-client";
//import { DefaultEventsMap } from "@socket.io/component-emitter";

//import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

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
    let socket;
    const sockets = {};
    let socketIo = ref(false);
    let socketId: string;

    // actions: { // aqui van todas las funciones que uno defina

    async function openSocket() {
      let urlSocket = url.value;
      const lon = urlSocket.length;
      urlSocket = urlSocket.slice(0, lon - 1);

      //const socket= new io()
      /*
      const json = {
        nom_emp: nom_emp.value,
        user: user.value,
        pass: "XASddweef12234esasasf.@dsesddsddsd",
      };
    */
      let force = false;
      if (sockets[nom_emp.value])
        sockets[nom_emp.value].connect(urlSocket, {
          forceNew: true,
        });
      else
        sockets[nom_emp.value] = io.connect(urlSocket, {
          auth: {
            nom_emp: nom_emp.value,
            user: user.value,
            pass: pass.value,
          },
        });

      socket = sockets[nom_emp.value];
      /*
      if (!socket || !socketIo.value) {
        console.log(
          "Socket url=>>>>>>>>>>>>>>>>",
          urlSocket,
          "id_con=",
          id_con.value,
          "socket=",
          socket
        );
        
        socket = io(urlSocket, {
          auth: {
            nom_emp: nom_emp.value,
            user: "administrator",
            pass: "XASddweef12234esasasf.@dsesddsddsd",
          },
        });
        */
      //      console.log("Socket url=>>>>>>>>>>>>>>>>", urlSocket, "json=", json);
      // Pasword invalido
      socket.on("loginFail", (res: string) => {

        MessageBox(res, 16, "Login failed");
        pass.value = "";

        //socketDisconnect(socket, res);
        return
      });

      socket.on("loginOk", async (res: {}) => {

        // console.log('loginOk========>', res)
        socketId = socket.id;
        //res={ id: name, dialect: options.dialect, fpo_pge }
        // obtenemos datos de conexión
        id_con.value = res.id;
        fpo_pge.value = await stringToDate(res.fpo_pge);
        dialect.value = res.dialect;
        leeMenu();

        console.log("Socket Connection sucefully id=", id_con.value);
      });

      // Imprime PDF en el navegador
      socket.on("pdfReport", async (res: {}) => {
        const htmlReport = res.htmlReport;
        await navigateTo(htmlReport, {
          open: {
            target: "_blank",
          },
        });
      });

      socket.on("error", (error) => {
        MessageBox(error, 16, "-- SQL Error --");
        if (error == "Timeout or connection error") {
          const router = useRouter();
          router.push("/Login");
        }

        console.warn("Error SQL=", error);
        return
      });

      socket.on("desconecta", (error: string) => {
        socketDisconnect(socket, error);
      });

      /*
      socket.on("broadcast", (res: []) => {
      });
     */
      socketIo.value = true;

      if (socket) {
        return true;
      }
      return false;
    }

    /// /////////////  open  ///////////////////
    // Hace la conexion al servidor NODEJS que
    // comunica con el servidor de SQL
    /// ////////////////////////////////////////
    async function open(password?: string) {
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


        const { data } = await useFetch('/api/callServer',
          {
            method: 'post',    // Se necesita para que haga la llamada y retorne los datos
            body: { call: 'leeEmpresas' }
          }
        )

        const dat_emp = data.value
        url.value = dat_emp[nom_emp.value].url; // obtenemos el url del servidor node

        //  logoEmp.value = dat_emp[nom_emp.value].logoEmp;
        logoEmp.value = await obtLogo(dat_emp[nom_emp.value].logoEmp)

      } catch (error) {
        console.warn("No existe empresa ", nom_emp.value);
        MessageBox(
          "No esta definida la empresa :" + nom_emp.value,
          16,
          "SQL Error "
        );
      }

      //await openSocket();

      if (await openSocket()) {
        const def_con = {
          nom_emp: nom_emp.value,
          user: user.value,
          pass: password,
        };

        const json = JSON.stringify(def_con);

        socket.emit("login", json); // hace login
        if (password.length > 0) pass.value = "";

        return;
      }
      /*
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
    */
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




      const dat_vis = {
        id_con: id_con.value,
        tip_llamada: "SQLEXEC",
        // tok_aut: this.tok_aut,
        query: "SELECT * from vcomeprg order by NUM_PRG,SIS_SIS,TPR_PRG",
      };

      if (socket) {
        // hay socket
        await socket.emit("sql async", dat_vis, (response) => {
          /*
      try {
         const res= await axios.post(url.value + "sql", dat_vis, {
          headers: { "Content-type": "application/json" },
        });
        response=res
      }catch (error) {
        console.log("Read Menu ", " Error", error);
        MessageBox(error.toJSON(), 16, "Back-End error ");
        const router = useRouter();
        router.push("/Login");
        return;
        // si no es un error de desconexion
      }
      */

          var data = [];

          for (let i = 0; i < response.length; i++) {
            const registro = {};
            for (const nom_cam in response[i]) {
              registro[nom_cam.toLowerCase()] = response[i][nom_cam];
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
          /*
          console.log(
            "Pinia ======leeMenu=====",
            menu.value,
            logoEmp.value,
            response
          );
          */
          dat_vis.query = " select * from publicvar";

          try {
            // const result = await axios.post(url.value + "sql", dat_vis);

            socket.emit("sql async", dat_vis, (data) => {
              /*  console.log("Pinia Var=", Var.value); */
              if (data && data.length > 0) {
                Var.value = data[0];
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
                /*
                console.log(
                  "Store publicVar Var.value=",
                  Var.value,
                  id_con.value
                );
                console.log("Pinia Var=", Var.value);
                */
              }
            });
          } catch (error) {
            console.warn("Can't read view publicvar", error);
          }
        });
      }
    }
    //////////////////////////////////

    function updateMenu(menuObt: any[]) {
      menu.value = menuObt;
    }


    //////////////////////////////////////////////
    // funcion obtLogo
    // Obtiene el logo de la empresa en base64 del servidor de nuxt (nitro)
    /////////////////////////////////////////////////

    async function obtLogo(fileLogoEmp: string) {
      const call = {
        method: 'post',    // Se necesita para que haga la llamada y retorne los datos
        body: {
          call: 'imgBase64',
          nameFile: fileLogoEmp
        }
      }

      const { data } = await useFetch('/api/callServer', call)
      const srcLogo = data.value //document.getElementById('bannerImg');

      //      localStorage.setItem("imgData", srcLogo);
      //      console.log('4) obtLogo() header file=', srcLogo)
      //      const dataImage = localStorage.getItem('imgData');
      //return dataImage;

      return srcLogo;
    }

    ///////////////////////////////////////////////////
    // watchers
    ////////////////////////////////////////////////////

    /*  watch(
        () => nom_emp.value,
        (new_emp, old_val) => {
        
          if (new_emp != old_val) {
            //  id_con.value = "";
            //  menu.value = []
          }
        },
        { deep: false }
      );
  */
    watch(
      () => id_con.value,
      (new_id, old_val) => {

        if (new_id != old_val) {
          if (new_id.length > 9 && nom_emp.value.length > 2) {
            console.log("currentSesion watch id_con", new_id, old_val);
            leeMenu();
          } else menu.value = [];
        }
      },
      { deep: false }
    );

    watch(
      () => pass.value,
      (new_pass, old_val) => {
        if (new_pass == "") return;

        const password = new_pass;
        if (
          password.length > 3 &&
          user.value.length > 0 &&
          nom_emp.value.length > 1
        ) {
          // pass.value = "";

          open(password);
        }
      },
      { deep: false }
    );

    //const doneMenu = computed(() =>
    //  menu.value.filter((menu) => menu.value.done)
    //);

    const socketDisconnect = (socket, men: string) => {
      MessageBox(men, 16, "-- SQL Error --");
      pass.value = "";
      socketIo.value = false;
      id_con.value = "";
      menu.value = [];

      //socket.off();
      //socket.destroy();
      //socket.cache.clear();
      socket.disconnect();
      console.warn("socket disconnect");
    };

    const sendMessage = (req: {}) => {
      socket.emit(req.msg, req.data);
    };

    const logOut = () => {
      $reset(); //  resetea lo valores a originales
      // desde la aplicacion haria lo mismo session.$reset()
      router.push("/");
    };

    // Llama al back-end para actualizar la base de datos por medio de sockets
    const updateSql = async (dat_act: {}) => {
      if (!socket) {
        openSocket();
        if (!socket) {
          const router = useRouter();
          MessageBox("Back end connection fail", 16, "Error");
          router.push("/Login");
          return;
        }
      }
      let data;

      //        .emit("sql async", dat_act, (res: []) => {
      try {
        const response = await socket.emitWithAck("sql async", dat_act);
        //console.log("1 Session Socket emit data", response);
        return response;
      } catch (err) {
        //console.error("2 Session Socket emit data", err);
        MessageBox("Back end connection fail" + err, 16, "Error");
        return null;
      }
      /*
        if (response.error) {
          console.error(response.error);
          reject(response.error);
        }

        */
    };
    /*      socket
        .emit("sql async", dat_act, (response) => {
          if (response.error) {
            console.error(response.error);
            reject(response.error);
          }
        else {  
          console.log("1 Session Socket emit data", response);
          resolve()
          data=[response]
        }  
        })
        .then(() => {
          console.log("2 Session Socket emit data", data);
          return data;
        });
         
      };
     */
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
      // doneMenu,
      Var,
      socketIo,
      fileLogoEmp,
      updateSql,
      sendMessage,
      logOut,
      openSocket,
      socket,
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
