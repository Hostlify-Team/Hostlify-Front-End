<template>
  <div class="services">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1>{{$t("services")}}</h1>
    </div>
    <div class="containerA">
      <div class="cardiv">
        <pv-card class="card">
          <template #content>
            <div>
              <div style="display: flex; justify-content: center;margin-top: 3rem;">
                <img src="@/assets/food.png" alt="" class="img">
              </div>
              <div style="display: flex; justify-content: center;margin-top: 4.3rem">
                <h2>{{$t("food service")}}</h2>
              </div>

            </div>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: center">
              <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('step-1')">{{$t("request service")}}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
      <div class="cardiv">
        <pv-card class="card">
          <template #content>
            <di>
              <div style="display: flex; justify-content: center;margin-top: 3rem">
                <img src="@/assets/cleaning.png" alt="" class="img">
              </div>
              <div style="display: flex; justify-content: center">
                <h2>{{$t("room cleaning")}}</h2>
              </div>
            </di>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: center">
              <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('clean-room')">{{$t("request service")}}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "services",
  data(){
    return{

    }
  },
  methods:{
    saveService(type){
      console.log(type)
      localStorage.setItem("service",type)
      this.$router.push("/"+type)
    }
  }
}
</script>

<style scoped>
.containerA{
  display: flex;
  justify-content: space-evenly;
  padding-top: 5rem
}
.services{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
.card{
  width: 22rem;
  border-radius: 1rem;
  height: 32rem
}
.img{
  width: 16rem;border-radius: 1rem
}

@media (max-width:800px){
  .containerA{
    display: block;
    justify-content: center;
    align-items: center;

  }
  .cardiv{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
}

</style>