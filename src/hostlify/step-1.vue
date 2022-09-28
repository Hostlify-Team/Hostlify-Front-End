<template>
  <div class="container">
    <h1>Servicios</h1>
    <div class="line"></div>
    <div class="stepper">
      <div class="punto">
        <span class="big dot"></span>
        <p>Seleción de platillo</p>
      </div>
      <div class="punto">
        <span class="dot"></span>
        <p>Seleción de platillo</p>
      </div>
      <div class="punto">
        <span class="dot"></span>
        <p>Seleción de platillo</p>
      </div>
      <div class="punto">
        <span class="dot"></span>
        <p>Seleción de platillo</p>
      </div>
    </div>

    <div class="container" style="display: flex; justify-content: space-around; height: 100vh; align-items: center;padding: 0 5rem">
      <pv-card style="width: 50vw; border-radius: 1rem; height: 60vh">
        <template #content>
          <div style="display: flex; justify-content:left">

            <h2>Habitación</h2>

          </div>
          <div style="display: flex; justify-content:center">
            <h1>H28</h1>
          </div>
          <div style="display: flex; justify-content:left">
            <h2>Solicite su platillo</h2>
          </div>
          <div style="display: flex; justify-content:center">
            <pv-input-text id="food"/>
            <br>

          </div>
          <div style="display: flex; justify-content:center">
            <br>
            <pv-input-number v-model="value2" showButtons buttonLayout="horizontal"
                             decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
          </div>
          <div style="display: flex; justify-content:center">
            <router-link to="/step-2"> <pv-button style="border-radius: 0.4rem">Siguiente</pv-button> </router-link>
          </div>
          <div style="display: flex; justify-content:center">
            <router-link to="/services"> <h6>Cancelar</h6> </router-link>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>


<script>
export default {
  name: "step-1",
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
.stepper{
  display: flex;
  justify-content: space-around;
}

.punto{
  display:flex;
  flex-direction: column;
}
.punto p{
  text-align: center;
  margin-top: 20%;
}


.line{
  width: 88%;
  height: 5%;
  margin-top: 1.5%;
  left: 6%;
  margin-right: -50%;
  position: absolute;
  background-color: #D6A049;

}

.dot {
  height: 100px;
  width: 100px;
  background-color: #f2f2f2;
  z-index: 100;
  border-radius: 100%;
}
.big {
  background-color: #D6A049
}
.container{
  font-family: 'Roboto', sans-serif;
}

</style>