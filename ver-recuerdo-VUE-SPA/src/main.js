import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from "vee-validate"

import axios from "axios"
import VueAxios from "vue-axios"


Vue.use(VueAxios, axios)

import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
//Vue.use(VeeValidate);


//se ejecuta cada que se trata de acceder a una ruta, solo permite ingresar a rutas no protegidas//primera proteccion desde front
router.beforeEach((to, from, next) => {
  //redirige al login si se trata de acceder a areas restringidas
  const publicPages = ['/login', '/registrarse', "/", "/acerca", "/logeado", "/canciones"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    console.log("ruta restringida");
    return next('/login');
  }
  next();
});
new Vue({
  router,
  store,
  created () {
    console.log("Created del vue root");
    let user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = localStorage.getItem('user');
    if (loggedIn) {
      //console.log(loggedIn);
      console.log("verifica y guarda en store si esta logeado");
      store.commit("indicarEstadoLogeado", true);
      //store.commit("llenarAlumno",user.alumno);
    }
  },
  mounted () {
    console.log("mounted root")
  },
  updated () {
    console.log("updated root")
  },
  render: h => h(App)
}).$mount('#app')

