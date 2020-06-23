import Vue from 'vue'
import Vuex from 'vuex'
import {handleResponse,authHeader} from "./helpers/helper"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //Son estados ,se guardan datos
    fotos:[],
    estaLogeado:false,
    loading:{
      mensaje:"",
      estado:false
    }
  },  
  mutations: {//se llaman desde otras vistas y mutan los state
            //solo acepta mutaciones o funcionses sincronas
    mostrarLoading(state){
      state.loading.estado=true;
    },
    ocultarLoading(state){
      state.loading.estado=false;
    },
    llenarFotos(state,fotos){
      state.fotos=fotos;
      console.log("guarda fotos en la store");
    },
    vaciarFotos(state,fotos){
      state.fotos=[];
    },
    indicarEstadoLogeado(state,estado){
      state.estaLogeado=estado;
    }
  },
  actions: {//se puede hace accioones asincronas
    async traerFotos(context){
      console.log("bajando fotos");
      const req={
        method:"GET",
        headers:authHeader() //agrega la cabecera del token para indicar que este autentificado
       };
      await fetch(process.env.VUE_APP_URL+"/images",req)
        .then(response=>handleResponse(response))
        .then(data=>{
          console.log("antes de tratar de guardar en store");
          console.log(data.fotos);
          context.commit("llenarFotos",data.fotos);//llama una mutacion
        })
        .catch(err=>{
          console.log("error trayendo data");
          console.log(err);
        });
    }

  },
})
