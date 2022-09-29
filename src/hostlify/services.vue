<template>
  <div class="title" style="margin: 4rem 4rem 0 4rem">
    <h1>Servicios</h1>
  </div>
  <div class="container" style="display: flex; justify-content: space-around; height: 80vh; align-items: center;padding: 0 2rem">
    <pv-card style="width: 19vw; border-radius: 1rem; height: 58vh">
      <template #content>
        <div>
          <div style="display: flex; justify-content: center;margin-top: 3rem;">
            <img src="@/assets/food.png" alt="" style="width: 14vw;border-radius: 1rem">
          </div>
          <div style="display: flex; justify-content: center;margin-top: 4.3rem">
            <h2>Food service</h2>
          </div>

        </div>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('food')">Solicitar servicio</pv-button>
        </div>
      </template>
    </pv-card>
    <pv-card style="width: 19vw; border-radius: 1rem; height: 58vh">
      <template #content>
        <div>
          <div style="display: flex; justify-content: center;margin-top: 3rem">
            <img src="@/assets/garden.png" alt="" style="width: 14vw;border-radius: 1rem">
          </div>
          <div style="display: flex; justify-content: center">
            <h2>Areas Recreacionales</h2>
          </div>

        </div>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('Recreational')">Solicitar servicio</pv-button>
        </div>
      </template>
    </pv-card>
    <pv-card style="width: 19vw; border-radius: 1rem; height: 58vh">
      <template #content>
        <di>
          <div style="display: flex; justify-content: center;margin-top: 3rem">
            <img src="@/assets/cleaning.png" alt="" style="width: 14vw;border-radius: 1rem">
          </div>
          <div style="display: flex; justify-content: center">
            <h2>Limpieza a la habitacion</h2>
          </div>
        </di>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: center">
          <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('Cleaning')">Solicitar servicio</pv-button>
        </div>
      </template>
    </pv-card>
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
      this.$router.push("/step-1")
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-around;
}
</style>