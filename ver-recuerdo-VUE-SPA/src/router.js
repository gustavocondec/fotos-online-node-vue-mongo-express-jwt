import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './views/Inicio.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/acerca',
      name: 'Acerca',
      component: () => import('./views/Acerca.vue')
    },
    {
      path: '/editar',
      name: 'Editar',
      component: () => import( './views/Editar.vue')
    },
    {
      path: '/fotos',
      name: 'Fotos',
      component: () => import('./views/Fotos.vue')
    },
    {
      path: '/registrarse',
      name: 'Registrarse',
      component: () => import('./views/Registrarse.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( './views/Login.vue')
    },
    {
      path: '/logeado',
      name: 'Logeado',
      component: () => import( './views/Logeado.vue')
    },
    {
      path:"/canciones",
      name:"Musica",
      component:()=>import("./components/Musica.vue")
    }
  ]
})
