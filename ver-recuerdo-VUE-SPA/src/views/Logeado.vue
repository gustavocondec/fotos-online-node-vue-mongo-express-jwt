<template>
    <div>
        <h2>Dashboard</h2>
        <p>Name: {{ user }}</p>
    </div>
</template>

<script>
import {authHeader,handleResponse} from "../helpers/helper"
import axios from "axios"
import router from "../router"

export default {
  name: "Logeado",
  data () {
    return {
      user: {
        name: "qqqqqqqqqqqqq"
      }
    }
  },
  methods: {
    getUserData: function () {
      const req={
        method:"GET",
        headers:authHeader()
      };
      return fetch(process.env.VUE_APP_URL+"/images",req)
      .then(response=>handleResponse(response))
      .then(data=>this.user=data);
    }
  },
  mounted () {
    this.getUserData()
  }
}
</script>
