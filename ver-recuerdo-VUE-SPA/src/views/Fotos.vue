<template>
  <div>

    <Musica v-if="usuarioCorrecto"></Musica>

    <div class="swiper-container">
      <div class="swiper-wrapper pb-4">
        <div v-show="fotos.length==0">
          <h2>Aun no tienes recuerdos subidos</h2>
        </div>
        <div
          class="swiper-slide"
          v-for="(foto,index) of fotos"
          :key="index"
          style="text-align:center"
        >
          <header style="font-size:5vw">
            <p class="badge badge-pill badge-danger">{{foto.title}}</p>
          </header>
          <img
            :src="foto.imgURL"
            alt=""
            class="swiper-slide img-fluid"
          >
          <div
            style="margin-right:auto;font-size:20px"
            class="my-1 mb-2"
          >
            <p style="color:white;font-color:white;max-width:500px; margin-left: auto;margin-right: auto;background-color:#3a87ad;border-radius:9px ">{{foto.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex"
import Musica from "../components/Musica"
import Swiper from 'swiper/dist/js/swiper.esm.bundle';
export default {
  components: {
    Musica
  },
  name: "fotos",
  data () {
    return {
      usuarioCorrecto: false
    }
  },
  computed: {
    ...mapState(["fotos", "loading"]),
  },
  async mounted () {
    this.comprobarUsuarioCorrecto();
    this.mostrarLoading({});
    await this.traerFotos();
    this.ocultarLoading({});
    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  },
  methods: {
    ...mapActions(["traerFotos"]),
    ...mapMutations(["mostrarLoading", "ocultarLoading"]),
    comprobarUsuarioCorrecto () {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user._id == "5ca31c591d7573001eb08c02")
        this.usuarioCorrecto = true;
    }
  },
  created () {
    console.log("created fotos")
  }
};
</script>

<style scoped>
body {
  background: #fff;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}
.swiper-container {
  width: 100%;
  height: 100%;
  padding-top: 0px;
  padding-bottom: 190px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  height: 450px;
  width: auto;
}
</style>
