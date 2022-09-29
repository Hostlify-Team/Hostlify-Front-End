<template>
  <div class="mapa">
    <h1>Mapa del hotel </h1>
    <img src="../assets/mapa.png" >
    <br><br> <br>
    <pv-button label="Volver" class="p-button-raised p-button-rounded" ></pv-button>
  </div>

</template>

<script>
export default {
  name: "map-hotel"
}
</script>

<style scoped>
.mapa {
  background-color:#011530;

}
.mapa h1{
  text-align: left;
  padding-left:10% ;
  padding-top: 3%;
  color: #D6A049;
  margin: auto;
}
.mapa img{
  padding-left: 30% ;
  width: 80%;
}
.mapa button {
  margin-left: 50%;
  background-color: #D6A049;
  color: white;

}
</style>