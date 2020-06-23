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
          <h1 class="text-center">Registrarse</h1>

          <b-form @submit="registrar">
            <b-form-group label="Nombre">
              <b-form-input
                v-model="name"
                type="text"
              >

              </b-form-input>

            </b-form-group>

            <b-form-group
              id="campo-correo"
              description="Sera su usuario"
              label="Ingrese su correo electronico"
              label-for="email"
            >
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                trim
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="campo-contraseña"
              label="Escriba una contraseña"
              :invalid-feedback="invalidFeedback"
              description="Debe contener 6 caracteres como minimo"
            >
              <b-form-input
                id="password"
                :state="validarPassword"
                v-model="password"
                type="password"
                requireds
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="campo-confirmar-contraseña"
              label="Confirme su contraseña"
              description="Las contraseñas deben coincidir"
            >
              <b-form-input
                id="confirm-password"
                :state="validarConfirmacionPassword"
                v-model="confirmpassword"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button
                block
                type="submit"
                variant="success"
              >Registar</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import { handleResponse } from "../helpers/helper"
import axios from "axios"
import router from "../router"
export default {
  name: "Registrarse",
  data () {
    return {
      name: "",
      email: '',
      password: "",
      confirmpassword: ""
    }
  },
  methods: {
    registrar (evt) {
      evt.preventDefault();
      console.log("click registrar");
      if (this.password == this.confirmpassword && this.password.length >= 6) {
        /*let data={
            name:this.name,
            email:this.email,
            password:this.password,
            confirmpassword:this.confirmpassword
        };
        const req={
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        return fetch(process.env.VUE_APP_URL+"/registrarse",req)
            .then((response)=>handleResponse(response))
            .then(data=>{
                console.log(data);
                alert("Registro correcto, inicie sesion")
                router.push("login")
                });
        */
        axios({
          method: "POST",
          url: process.env.VUE_APP_URL + "/registrarse",
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            confirmpassword: this.confirmpassword
          },
          timeout: 10000

        })
          .then((response) => {
            console.log(response);
            console.log("entra al response")
            if (response.status == "200") {
              alert("Registro correcto, inicie sesion");
              router.push("login");
            } else {
              alert("El correo ya se encuentra en uso, registrese con otro correo");
              console.log("error correo en uso")
            }

          })
          .catch((error) => {
            console.log("captura error");
          })


      } else {
        alert("error")
      }
    }
  },
  computed: {
    invalidFeedback () {
      if (this.password.length > 6) {
        return ''
      } else if (this.password.length > 0) {
        return 'Ingresese como minimo 6 caracteres'
      } else {
        return 'Por favor escriba algo'
      }
    },
    validarPassword () {
      return this.password.length >= 6 && this.password.length <= 12;
    },
    validarConfirmacionPassword () {
      return this.password == this.confirmpassword;
    }
  },
  created () {
    console.log("created registrarse")
  }
}
</script>