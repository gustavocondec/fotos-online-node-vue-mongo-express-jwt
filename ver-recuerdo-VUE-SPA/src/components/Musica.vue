<template>
  <div>
    <b-row
      align-v="center"
      align-h="center"
      align-content="center"
      align-text="center"
    >
      <b-col
        xl="4"
        lg="4"
        md="4"
        sm="6"
        align-self="center"
      >
        <audio
          :src=musicaAhora
          autoplay=usuarioCorrecto
          controls
          loop
        >
        </audio>
      </b-col>
      <b-col
        xl="8"
        lg="6"
        md="6"
        sm="4"
      >
        <b-form-select
          v-model="seleccion"
          :options="nombres"
          :click=escuchar(this.seleccion)
        ></b-form-select>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "login",
  data () {
    return {
      nombres: [
      ],
      musicaAhora: process.env.VUE_APP_URL + "/cancion/music.mp3",
      seleccion: "El Privilegio de Amar-Mijares y Lucero.mp3",
      usuarioCorrecto: false
    }
  },
  methods: {
    traerlista () {
      console.log("trae lista")
      axios({
        method: "GET",
        url: process.env.VUE_APP_URL + "/canciones"
      })
        .then((response) => {
          this.nombres = response.data;
          console.log(this.nombres);
        });
    },
    escuchar (nombre) {
      console.log("escucha" + nombre);
      this.musicaAhora = process.env.VUE_APP_URL + "/cancion/" + nombre;
      console.log(this.musicaAhora);
    },
    comprobarUsuarioCorrecto () {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user._id == "5ca3dgdfdf2")
        this.usuarioCorrecto = true;
    }

  },
  mounted () {
    this.comprobarUsuarioCorrecto();
    this.traerlista();
    //this.musica=process.env.VUE_APP_URL+"/cancion/"+"music.mp3";
  }
}
</script>