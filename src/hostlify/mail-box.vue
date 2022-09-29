<template>
  <div class="BuzondeSugerencias">
    <h1>Búzon de Sugerencias</h1>
    <h2>Ayudanos a mejorar nuestro proceso</h2>
    <h3>Comentario</h3>
    <Textarea v-model="value" :autoResize="true" rows="6" cols="40" />
    <br><br> <br>
    <pv-button label="Enviar"  v-on:click="displayModal=true" ></pv-button>
    <h4>Llamar a un asesor +51 9235689</h4>

    <pv-dialog header="Sugerencia realizada exitosamente  !!!" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true">
      <p class="m-0"></p>

      <template #footer>
        <pv-button label="Volver"  v-on:click="displayModal=false" autofocus />
      </template>
    </pv-dialog>
  </div>



  <div class="Buzon">

    <h2>Libro de Reclamaciones</h2>
    <br> <br>
    <img src="../assets/LibroReclamaciones.png" >
    <br>
    <pv-button label="Volver" @click="goBack" />
  </div>

</template>

<script>
export default {
  name: "mail-box",
  data(){
    return{  displayModal: false}
  },
  methods:{
    goBack(){
      this.$router.push("/services")
    }
  }
}

</script>

<style scoped>
.BuzondeSugerencias {
  background-color:#011530;

}
.BuzondeSugerencias h1{
  text-align: left;
  padding-left:5% ;
  padding-top: 3%;
  color: #D6A049;
  margin: auto;
}
.BuzondeSugerencias h2{
  text-align: left;
  padding-left:10% ;
  padding-top: 3%;
  color: #D6A049;
  margin: auto;
}
.BuzondeSugerencias h3{
  text-align: left;
  padding-left:5% ;
  padding-top: 2%;
  color: #D6A049;
  margin: auto;
}
.BuzondeSugerencias h4{
  float: right;
  text-align: right;
  margin: auto;
  padding-right:78% ;
  color: #D6A049;

}
.BuzondeSugerencias  button {

  margin-left: 5%;
  background-color: #D6A049;
  color: white;

}
.BuzondeSugerencias Textarea{
  margin-left: 5%;
  background-color: #ffffff;
}

.Buzon {
  background-color:#011530;

}
.Buzon h2{
  text-align: left;
  padding-left:5% ;
  padding-top: 3%;
  color: #D6A049;
  margin: auto;
}
.Buzon img{
  padding-left: 20%;
  height: 30% ;
  width: 30%;
}
.Buzon h4{
  float: right;
  text-align: right;
  margin: auto;
  padding-left:10% ;
  color: #D6A049;
}
.Buzon  button  {

  margin-left: 5%;
  background-color: #D6A049;
  color: white;

}

</style>