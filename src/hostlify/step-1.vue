<template>
  <div class="container">
    <h1 style="font-weight: bolder;color: #D6A049">Solicitar servicio</h1>
    <div class="row" style="">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progressBar">
          <ul class="progressBar">
            <li class="active">Seleción de platillo</li>
            <li >Seleción de bebida</li>
            <li >Extras</li>
            <li >Confirmacion</li>
          </ul>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around;margin-top: 3rem;" >
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:left">
            <h2>Habitación</h2>
          </div>
          <div style="display: flex; justify-content:center">
            <h1 style="text-align: center">{{ roomName }}</h1>
          </div>
          <div style="display: flex; justify-content:left">
            <h2>Solicite su platillo</h2>
          </div>
          <div style="display: flex;margin-bottom:30px; justify-content:center">
            <pv-dropdown v-model="selectedDish" :options="dishes"  placeholder="Eliga un platillo" style="width:500px"></pv-dropdown>
          </div>
          <div style="display: flex; justify-content:center">
            <br>
            <pv-input-number v-model="dishQuantity" showButtons buttonLayout="horizontal"
                             incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
          </div>
          <div style="display: flex; justify-content:center">
            <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold;margin-top: 1.5rem" @click="next">Siguiente</pv-button>
          </div>
          <div style="display: flex; justify-content:center">
            <router-link style="text-decoration:none; color:#D6A049" to="/services"> <h6>Cancelar</h6> </router-link>
          </div>
        </template>
      </pv-card>

    </div>
  </div>

</template>


<script>
import {RoomServices} from "../services/room-services";
export default {
  name: "step-1",
  data(){
    return{
      roomName:null,
      dishes:["Ceviche","Lomo saltado","Aji de gallina","Causa Limeña","Arroz con pollo","Tallarines verdes","Pollo a la brasa"],
      selectedDish:null,
      dishQuantity:1,
    }
  },
  created() {
    new RoomServices().getRoomForGuest(sessionStorage.getItem("id")).then(response=> {
      this.roomName=response.data[0].roomName
    })

  },
  methods:{
    next(){
      sessionStorage.setItem("dish",this.selectedDish)
      sessionStorage.setItem("dishQuantity",this.dishQuantity)
      this.$router.push("/step-2")
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