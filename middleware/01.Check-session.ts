
import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Route Middleware ')
  const session = Session()
  const { id_con, user, nom_emp, menu, fpo_pge, logoEmp } = storeToRefs(session)  //pasa los elementos por referencia al Global

  console.log('Route Middleware - Check Login to=', to, 'from=', from, 'user=', user.value, 'id_con=', id_con.value, 'nom_emp=', nom_emp.value, 'menu=', menu.value, 'fpo_pge=', fpo_pge.value, 'logoEmp=', logoEmp.value)

  if (user.value == '' || id_con.value == '') {
    return navigateTo('/Login');
  }
});
