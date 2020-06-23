<template>
  <div id="app" :class="{'confondo':usuarioCorrecto}">
    <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand href="#">Recuerdo</b-navbar-brand>
         <div v-show="loading.estado" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
        </div>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name:'Inicio'}" exact>Inicio</b-nav-item>   <!--acepta el router link automaticamente, exact para que sea activo si sta ahi -->
          <b-nav-item :to="{name:'Acerca'}">Acerca</b-nav-item>
          <b-nav-item :to="{name:'Fotos'}" v-show="estaLogeado">Fotos</b-nav-item>
          <b-nav-item :to="{name:'Editar'}" v-show="estaLogeado">Editar</b-nav-item>
        </b-navbar-nav>
        <!-- desde aqui se pega a la dercha-->
        <b-navbar-nav class="ml-auto">    
          <b-nav-item :to="{name:'Registrarse'}" v-show="!estaLogeado">Registrase</b-nav-item>
          <b-nav-item :to="{name:'Login'}" v-show="!estaLogeado">Iniciar Sesion</b-nav-item>
          <b-nav-item v-show="estaLogeado"><b-button @click="cerrarSesion">Cerrar Sesion</b-button></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
    </b-navbar>
    </div>
    <b-container >
        <router-view/>
    </b-container>
  </div>
</template>

<script>
import router from "./router"
import {mapState,mapMutations} from "vuex"
export default {
  name:"app",
  data(){
    return{
      usuarioCorrecto:false
    }
  },
  computed:{
    ...mapState(["loading","estaLogeado"])//importamos estados
  },
  methods:{
    cerrarSesion(){
      console.log("click cerrar sesion");
      this.llenarFotos({});//hacemos una mutacion del stado fotospara vaciarlo
      this.indicarEstadoLogeado(false);//cambiamos a falso esta logueado
      localStorage.removeItem('user');//borramos el usuarioy su token
      router.push("/");//vamos a l apagina inicial
    },
    ...mapMutations(["llenarFotos","indicarEstadoLogeado"]),
    comprobarUsuarioCorrecto(){
      let user = JSON.parse(localStorage.getItem('user'));
      if(user._id=="5ca31c59adfdadgdg2")
        this.usuarioCorrecto=true;
        
    }
  },
  mounted(){
    this.comprobarUsuarioCorrecto();
  }
}
</script>

<style>
  .confondo{
    background-image:url("https://res.cloudinary.com/dwtm2jq1f/image/upload/v1575415814/cora1.jpg")
  }
</style>