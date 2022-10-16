<template>
  <div class="container">
    <h1 style="font-weight: bolder;color: #D6A049">Solicitar servicio</h1>
    <div class="row" style="">
      <div class="col-xs-12 col-md-8 offset-md-2 block border">
        <div class="wrapper-progressBar">
          <ul class="progressBar">
            <li class="active">Seleción de platillo</li>
            <li class="active">Seleción de bebida</li>
            <li class="active">Extras</li>
            <li class="active">Confirmacion</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container" style="display: flex; justify-content: space-around; margin-top: 3rem">
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:center">
            <h1>Confirmar pedido</h1>
          </div>
          <div style="margin-left: 5rem">
            <h1 >Resumen del pedido</h1>
            <div>
              <h3>Platillo: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 10rem 0 1.5rem">
                <div>
                  <p>{{order.dish}}</p>
                </div>
                <div>
                  <p>Cant. {{order.dishQuantity}}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Bebida: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 10rem 0 1.5rem">
                <div>
                  <p>{{order.drink}}</p>
                </div>
                <div>
                  <p>Cant. {{order.drinkQuantity}}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Crema: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 10rem 0 1.5rem">
                <div>
                  <p>{{order.cream}}</p>
                </div>
                <div>
                  <p>Cant. {{order.creamQuantity}}</p>
                </div>
              </div>
            </div>
            <div v-if="order.instruction!==null">
              <h3>Intruccion: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 10rem 0 1.5rem">
                <div>
                  <p>{{order.instruction}}</p>
                </div>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content:center;margin-bottom:10px;margin-top:30px">
            <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold" @click="sendOrder">Confirmar</pv-button>
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
import {FoodServices} from "../services/food-services";
export default {
  name: "step-4",
  data(){
    return{
      order:[]
    }
  },
  created() {
    new RoomServices().getRoomForGuest(sessionStorage.getItem("id")).then(response=> {
      this.order.roomId=response.data[0].id
      this.order.dish=sessionStorage.getItem("dish")
      this.order.dishQuantity=sessionStorage.getItem("dishQuantity")
      this.order.drink=sessionStorage.getItem("drink")
      this.order.drinkQuantity=sessionStorage.getItem("drinkQuantity")
      this.order.cream=sessionStorage.getItem("cream")
      this.order.creamQuantity=sessionStorage.getItem("creamQuantity")
      if(sessionStorage.getItem("instructions")==="null"){
        this.order.instruction=null
      }else {
        this.order.instruction=sessionStorage.getItem("instructions")
      }

    })
  },
  methods:{
    sendOrder(){
      sessionStorage.removeItem("dish")
      sessionStorage.removeItem("dishQuantity")
      sessionStorage.removeItem("drink")
      sessionStorage.removeItem("drinkQuantity")
      sessionStorage.removeItem("cream")
      sessionStorage.removeItem("creamQuantity")
      sessionStorage.removeItem("instructions")
      new FoodServices().postFoodService(this.order).then(response=>{
        let temporaryServiceId=response.data.id
        this.$toast.add({severity:'success', summary: 'Enviado', detail:'Orden enviada', life: 3000});
        new RoomServices().getRoomForGuest(parseInt(sessionStorage.getItem("id"))).then(response=>{
          let roomForGuest=response.data
          roomForGuest[0].servicePending=true
          new RoomServices().updateRoom(roomForGuest[0].id,roomForGuest[0])
        })
        this.$router.push("/services")
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.wrapper-progressBar {
  width: 100vw;
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