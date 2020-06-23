<template>
  <div>
    <b-container class="mt-3">
      <b-row>
        <b-col
          cols="12"
          md="4"
          lg="4"
        >
          <b-card>
            <b-card-header>
              <h2>Agregar Fotos</h2>
            </b-card-header>
            <b-card-body>
              <b-form @submit="subirFoto">
                <b-form-group label="Titulo">
                  <b-form-input
                    type="text"
                    v-model="title"
                    required
                  > </b-form-input>
                </b-form-group>
                <b-form-group label="Descripcion">
                  <b-form-input
                    type="text"
                    v-model="description"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Seleccione una imagen">
                  <b-form-file
                    v-model="image"
                    :state="Boolean(image)"
                    placeholder="Escoja una foto"
                    drop-placeholder="arrastrea hasta aqui"
                    v-on:change="handleFileUpload"
                    name="image"
                    required
                  >
                  </b-form-file>
                  <p>nuevaFoto: {{image}}</p>
                </b-form-group>
                <b-form-group :disabled="estaCargandoSubir">
                  <b-spinner
                    v-show="estaCargandoSubir"
                    small
                    type="grow"
                  ></b-spinner>
                  <b-button
                    block
                    type="submit"
                    variant="danger"
                  >{{mensajeSubir}}</b-button>
                </b-form-group>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col
          cols="12"
          md="8"
          lg="8"
          style="background-color:white"
        >
          <b-table
            class="mt-3"
            small
            :fields="campos"
            :items="fotos"
          >
            <template
              slot="titulo"
              slot-scope="data"
            >
              {{data.item.description}}
            </template>
            <template
              slot="descripcion"
              slot-scope="data"
            >
              {{data.item.descripcion}}
            </template>
            <template
              slot="opciones"
              slot-scope="data"
            >
              <a
                class="btn btn-warning"
                :href="data.item.imgURL"
              >ver</a>
              <b-button
                @click="borrar(data.item._id)"
                variant="danger"
                class="ml-2"
                :disabled="estaCargando"
              >
                <b-spinner
                  v-show="estaCargando"
                  small
                  type="grow"
                ></b-spinner>
                {{mensajeBorrar}}
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
import axios from "axios"
import { mapActions, mapState, mapMutations } from "vuex"
import router from "../router"
import { authHeader } from "../helpers/helper"
export default {
  name: "Editar",
  data () {
    return {
      campos: [
        { key: "title", label: "Titulo" },
        { key: "description", label: "Descripcion" },
        { key: "opciones", label: "Opciones" }
      ],
      title: "",
      description: "",

      estaCargando: false,
      estaCargandoSubir: false,
      image: "",
    }
  },

  methods: {
    subirFoto (evt) {
      evt.preventDefault();
      this.estaCargandoSubir = true;
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        //si est aguardado
        console.log(user.token);
        //return { 'Authorization': 'Bearer ' + user.token }  
      } else {
        console.log("no se encontro token");
      }
      //primero validar la foto, luego seguir
      let formData = new FormData();
      formData.append("image", this.image);
      //ojo si se envia mas datos se hace json.sytingify
      formData.append("title", JSON.stringify(this.title));
      formData.append("description", JSON.stringify(this.description));
      console.log(this.title);
      axios({
        method: "POST",
        url: process.env.VUE_APP_URL + "/images/add",
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + user.token
        },
        data: formData
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.response)
        })
        .finally(() => {
          console.log("prueba del push editar")
          this.estaCargandoSubir = false;
          location.reload(true)
        })

    },
    handleFileUpload () {
      console.log(this.image)
      //this.prueba=this.$refs.file.files[0];
    },
    borrar (id) {
      this.estaCargando = true;
      console.log(id);
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        //si est aguardado
        console.log(user.token);
        //return { 'Authorization': 'Bearer ' + user.token }  
      } else {
        console.log("no se encontro token");
      }
      axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "/images/delete/" + id,
        headers: {
          'Authorization': 'Bearer ' + user.token
        },
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response)
        })
        .finally(() => {
          this.estaCargando = false;
          location.reload(true)
        })

    },
    ...mapActions(["traerFotos"]),
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),
  },
  computed: {
    ...mapState(["fotos", "loading"]),
    mensajeSubir () {
      if (this.estaCargandoSubir == false)
        return "Subir Foto"
      else
        return "Subiendo Foto ..."
    },
    mensajeBorrar () {
      if (this.estaCargando == false)
        return "Borrar"
      else
        return "Borrando foto ..."
    }
  },
  async mounted () {
    this.mostrarLoading({});
    await this.traerFotos();
    this.ocultarLoading({});
  },
  created () {
    console.log("created editar")
  }
}
</script>