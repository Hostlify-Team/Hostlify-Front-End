<template>
  <div class="container">
    <h1 style="font-weight: bolder;color: #D6A049">{{$t("request service")}}</h1>
    <div style="display: flex; justify-content: space-around;margin-top: 3rem;" >
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:left">
            <h2>{{$t("room")}}</h2>
          </div>
          <div style="display: flex; justify-content:center">
            <h1 style="text-align: center">{{ roomName }}</h1>
          </div>
          <div style="display: flex; justify-content:center">
            <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold;margin-top: 1.5rem" @click="next">Solicitar limpieza</pv-button>
          </div>
          <div style="display: flex; justify-content:center">
            <router-link style="text-decoration:none; color:#D6A049" to="/services"> <h6>{{$t("cancel")}}</h6> </router-link>
          </div>
        </template>
      </pv-card>

    </div>
  </div>

</template>


<script>
import {RoomServices} from "../services/room-services";
export default {
  name: "CleanRoomService",
  data(){
    return{
      token: sessionStorage.getItem("jwt"),
      roomName:null
    }
  },
  created() {
    new RoomServices().getRoomForGuest(this.token, sessionStorage.getItem("id")).then(response=> {
      this.roomName=response.data.roomName
    })

  },
  methods:{
    next(){

      this.$router.push("/services")
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.wrapper-progressBar {
  width: 95vw;
  height: 10vh;
}

.progressBar {
}

.progressBar li {
  list-style-type: none;
  float: left;
  width: 22%;
  position: relative;
  text-align: center;
}

.progressBar li:before {
  content: " ";
  line-height: 30px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  display: block;
  text-align: center;
  margin: 0 auto 10px;
  background-color: white
}

.progressBar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}

.progressBar li:first-child:after {
  content: none;
}

.progressBar li.active {
  color: #D6A049;
}

.progressBar li.active:before {
  border-color: #D6A049;
  background-color: #D6A049
}

.progressBar .active:after {
  background-color: #D6A049;
}

.container{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin: 3rem;
}

</style>