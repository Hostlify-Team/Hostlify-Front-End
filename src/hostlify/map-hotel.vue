<template>
  <div class="map">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1>Mapa del Hotel</h1>
    </div>
    <div class="map_hotel">
      <img src="../assets/mapa.png" >
    </div>
    <div class="map_button">
      <pv-button label="Volver" class="p-button-raised p-button-rounded" @click="goBack()"></pv-button>
    </div>
  </div>

</template>

<script>
export default {
  name: "map-hotel",
  methods:{
    goBack(){
      this.$router.push("/services")
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.map {
  font-family: 'Roboto', sans-serif;

}
.map_hotel{
  display: flex;
  justify-content: center;
}
.map_hotel img{
  width: 600px;
}
.map_button{
  display: flex;
  justify-content: end;
  margin-top: 3rem;
}
.map button {
  border-radius: 3rem;
  border-style: none;
  background-color: #D6A049;
  color: white;

}
@media (max-width:650px){
  .map_hotel img{
    width: 500px;
  }
}
@media (max-width:638px){
  .map_hotel img{
    width: 300px;
  }
}



</style>