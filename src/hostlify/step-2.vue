<template>
  <div class="container">
    <h1 style="font-weight: bolder;color: #D6A049">{{$t("request service")}}</h1>
    <div class="row" style="">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progressBar">
          <ul class="progressBar">
            <li class="active">{{$t("select your dish")}}</li>
            <li class="active">{{$t("select your drink")}}</li>
            <li >{{$t("select your cream")}}</li>
            <li >{{$t("confirmation")}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container" style="display: flex; justify-content: space-around; margin-top: 3rem">
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:left">
            <h2>Seleccione su bebida</h2>
          </div>
          <div style="display: flex;margin-bottom:30px; justify-content:center">
            <pv-dropdown v-model="selectedDrink" :options="drinks"  placeholder="Eliga una bebida" style="width:500px"></pv-dropdown>
          </div>
          <div style="display: flex; justify-content:center">
            <br>
            <pv-input-number v-model="drinkQuantity" showButtons buttonLayout="horizontal"
                             incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
          </div>
          <div style="display: flex; justify-content:center;margin-bottom:10px;margin-top:30px">
            <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold;margin-top: 1.5rem" @click="next">{{$t("next")}}</pv-button>
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
export default {
  name: "step-2",
  data(){
    return{
      drinks:["Chicha Morada","Inca Kola","Pisco Sour","Chicha de Jora","Agua"],
      selectedDrink:null,
      drinkQuantity:1,
    }
  },
  methods:{
    next(){
      sessionStorage.setItem("drink",this.selectedDrink)
      sessionStorage.setItem("drinkQuantity",this.drinkQuantity)
      this.$router.push("/step-3")
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