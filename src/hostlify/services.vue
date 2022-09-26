<template>
  <div style="height: 100vh">
    <div class="title">
      <h1>Servicios</h1>
    </div>
    <div class="container">
      <pv-card style="width: 21vw">
        <template #content>
          <img src="@/assets/food.png" alt="" style="width: 300px">
          <p>Food service</p>
          <router-link to="/request">
            <pv-button>Solicitar servicio</pv-button>
          </router-link>
        </template>
      </pv-card>
      <pv-card style="width: 21vw">
        <template #content>
          <img src="@/assets/food.png" alt="" style="width: 300px">
          <p>Food service</p>
          <router-link to="/request">
            <pv-button>Solicitar servicio</pv-button>
          </router-link>
        </template>
      </pv-card>
      <pv-card style="width: 21vw">
        <template #content>
          <img src="@/assets/food.png" alt="" style="width: 300px">
          <p>Food service</p>
          <router-link to="/request">
            <pv-button >Solicitar servicio</pv-button>
          </router-link>
        </template>
      </pv-card>

    </div>
  </div>

</template>

<script>
export default {
  name: "services"
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: space-around;
}
</style>