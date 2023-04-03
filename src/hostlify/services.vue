<template>
  <div class="services">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1>{{$t("services")}}</h1>
    </div>
    <div class="container" >
      <div class="firstGroup">
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
.container{
  display: flex;
  justify-content: space-around;
  height: 80vh; align-items: center;padding: 0 2rem
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
.firstGroup{
  width: 66.6vw;
  display: flex;
  justify-content: space-around;
}
.secondGroup{
  width: 33.3vw;
  display: flex;
  justify-content: space-around;

}
@media (max-width:1193px){
  .container{
    display: block;
    justify-content: space-around;
    height: 120vh;
    align-items: center;
    padding: 0 2rem;

  }
  .firstGroup{
    margin: 3rem 0;
    width: 91vw;
    display: flex;
    justify-content: space-around;
  }
  .secondGroup{
    width: 90vw;
    display: flex;
    justify-content: space-around;

  }
}

@media (max-width:800px){
  .container{
    display: block;
    justify-content: center;
    height: 190vh;
    align-items: center;
    padding: 0 2rem;

  }
  .firstGroup{
    display: block;
    width: 90vw ;
    align-items: center;
  }
  .secondGroup{
    width: 90vw;
    display: flex;
    justify-content: space-around;

  }
  .cardiv{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
}

</style>