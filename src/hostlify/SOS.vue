<template>
  <div class="SOS">
    <h2>Boton de Emergencia</h2>
    <br>
    <img src="../assets/SOS.png" >
    <br>
    <pv-button label="Volver" @click="goBack"> </pv-button>
    <br><br>
  </div>
</template>

<script>
export default {
  name: "SOS",
  methods:{
    goBack(){
      this.$router.push("/services")
    }
  }
}
</script>

<style scoped>
.SOS {
  background-color:#011530;

}
.SOS h2{
  text-align: left;
  padding-left:5% ;
  padding-top: 3%;
  color: #D6A049;
  margin: auto;
}
.SOS img{
  padding-left: 20%;
  height: 50% ;
  width: 50%;

}
.SOS button {
  width: 215.69px;
  height: 40.75px;
  margin-left: 30%;
  margin-top:3%;
  background-color: #D6A049;
  color: white;

}
</style>