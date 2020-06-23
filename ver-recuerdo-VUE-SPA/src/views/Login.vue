<template>
  <div>
    <b-row align-h="center">
      <b-col
        cols="12"
        md="8"
        lg="6"
        mx-auto
      >
        <b-card class="mt-3">
          <h1 class="text-center">Iniciar Sesion</h1>
          <b-form @submit="iniciarSesion">
            <b-form-group
              id="campo-correo"
              label="Ingrese su correo electronico"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                trim
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="campo-contraseña"
              label="Ingrese su contraseña"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button
                block
                type="submit"
                variant="success"
                :disabled="estaCargando "
              >Iniciar Sesion
                <b-spinner
                  v-show="estaCargando"
                  small
                  type="grow"
                ></b-spinner>
              </b-button>
            </b-form-group>
          </b-form>
          <b-link v-b-modal.modal-olvido>
            ¿Se te olvido tu contraseña?
          </b-link>
          <b-modal
            id="modal-olvido"
            title="Olvido su contraseña"
          >
            <h2>Restablecer contraseña</h2>
            <p>Ingrese el correo con el que se registro. Te enviaremos un correo</p>
            <b-form @submit="olvidoPassword">
              <b-form-group label="Correo:">
                <b-form-input
                  v-model="correoRecuperacion"
                  type="email"
                  required
                  trim
                >

                </b-form-input>
              </b-form-group>
              <b-button
                type="submit"
                variant="success"
                :disabled="estaCargando"
              >
                Solicitar cambio contraseña
                <b-spinner
                  v-show="estaCargando"
                  small
                  type="grow"
                ></b-spinner>
              </b-button>
            </b-form>
          </b-modal>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
import router from "../router"
import axios from "axios"
import { handleResponse } from "../helpers/helper"
export default {
  name: "Login",
  data () {
    return {
      form: {
        email: "",
        password: ""
      },
      correoRecuperacion: "",
      estaCargando: false
    }
  },
  methods: {
    ...mapMutations(["indicarEstadoLogeado"]),//importamos mutaciones que pueden afectar los estados
    iniciarSesion (evt) {
      evt.preventDefault();
      this.estaCargando = true
      console.log("click boton iniciar sesion");
      axios({
        method: "POST",
        url: process.env.VUE_APP_URL + "/login",
        headers: { 'Content-Type': 'application/json' },
        data: this.form,
        timeout: 10000
      })
        .then(response => {
          console.log(response);
          if (response.data.token) {//Si se le envia el token de usuario
            this.form = {};//vaciamos el formmulario
            localStorage.setItem("user", JSON.stringify(response.data));//guardamos el token y datos del usuario
            console.log("Logueo correctamente");
            this.indicarEstadoLogeado(true);//llama a la mutacion y le pasa un valor
            router.push("fotos");
          }
        })
        .catch(err => {
          console.log(err)
          alert(err)
        })
        .finally(() => {
          this.estaCargando = false
        })

    },
    olvidoPassword (evt) {
      evt.preventDefault();
      this.estaCargando = true;
      console.log("click pedir contraseña nueva");
      axios({
        method: "POST",
        url: process.env.VUE_APP_URL + "/user/recuperar",
        headers: { 'Content-Type': 'application/json' },
        data: {
          correo: this.correoRecuperacion
        },
        timeout: 10000
      })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            console.log("solicitud contraseña nueva correcto");
            this.correoRecuperacion = "";
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.estaCargando = false
        })
    }
  },
  computed: {
    ...mapState(["estaLogeado"])  //importamos un estado
  },
  created () {
    console.log("created login")
    localStorage.removeItem('user');
  }

}
</script>
