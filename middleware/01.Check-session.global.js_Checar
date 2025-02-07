
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  const session = Session()

  //const { id_con, user, nom_emp, menu, fpo_pge, logoEmp } = storeToRefs(session)  //pasa los elementos por referencia al Global
  const id_con=session.id_con
  const user=session.user 
  const nom_emp=session.nom_emp
  //console.log('Route Middleware - Check Login to=', to.fullPath, 'from=', from.fullPath, 'user=', user.value, 'id_con=', id_con.value, 'nom_emp=', nom_emp.value)
  console.log('Route Middleware - Check Login to=', to.fullPath, 'from=', from.fullPath, 'user=', user, 'id_con=', id_con, 'nom_emp=', nom_emp)
 
  if (to.fullPath=='/' || to.fullPath=='/Login')
     return
 
     
  if (user.value == '' || id_con.value == '') {
    return navigateTo('/Login');
  }



});
