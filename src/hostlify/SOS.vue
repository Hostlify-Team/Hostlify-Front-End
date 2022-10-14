<template>
  <div class="SOS">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1 style="margin-top: 0">Ayuda</h1>
    </div>
    <div class="SOS_alert">
      <pv-button v-show="emergency===false" @click="emergencyOn">
        SOS
      </pv-button>
      <pv-button v-show="emergency===true" style="font-size: 70px;" @click="emergencyOff">
        APAGAR
      </pv-button>
    </div>
    <div class="SOS_button">
      <pv-button label="Volver" @click="goBack"> </pv-button>
    </div>
  </div>
</template>

<script>
import {RoomServices} from "../services/room-services";
import {ref} from "vue";
export default {
  name: "SOS",
  components: {},
  data(){
    return{
      emergency:false,
    }
  },
  methods:{
    goBack(){
      this.$router.push("/services")
    },
    emergencyOn(){
      this.emergency=true
      this.emergencyRoom(true)
    },
    emergencyOff(){
      this.emergency=false
      this.emergencyRoom(false)
    },
    emergencyRoom(emergencyStatus){
      new RoomServices().getRoomForGuest(sessionStorage.getItem("id")).then(response=>{
        let room =response.data[0]
        room.emergency=emergencyStatus
        new RoomServices().updateRoom(response.data[0].id,room).then(response=>{
          console.log("Emegency: ",emergencyStatus)
        })
      })
    }
  },
  created() {
    new RoomServices().getRoomForGuest(sessionStorage.getItem("id")).then(response=>{
      this.emergency=response.data[0].emergency
    })
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.SOS {
  width: 95vw;
  height: 83vh;
  font-family: 'Roboto', sans-serif;

}
.SOS_alert{
  display: flex;
  justify-content: center;
}
.SOS_alert button{
  border-radius: 50rem;
  background-color: #d6a049;
  display: flex;
  justify-content: center;
  width: 450px;
  height: 450px;
}
.SOS_alert button {
  font-weight: bold;
  font-family: Arial;
  font-size: 140px;
  color: white;
}
.SOS_button{
  display: flex;
  justify-content: end;
}
.SOS_button button {
  margin-top: 3rem;
  border-radius: 3rem;
  border-style: none;
  background-color: #D6A049;
  color: white;

}
@media (max-width:498px){
  .SOS_alert button{
    border-radius: 50rem;
    background-color: #d6a049;
    display: flex;
    justify-content: center;
    width: 310px;
    height: 310px;
  }
  .SOS_alert button {
    font-weight: bold;
    font-family: Arial;
    font-size: 80px;
    color: white;
  }
}
</style>