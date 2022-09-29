<template>
  <div class="container">
    <h1>Servicios</h1>
    <div class="line"></div>
    <div class="stepper">
      <div class="punto">
        <span class="color dot"></span>
        <p>Seleción de platillo</p>
      </div>
      <div class="punto">
        <span class="color dot"></span>
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

    <div class="container" style="display: flex; justify-content: space-around; margin-top: 3rem">
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:left">
            <h2>Seleccione su bebida</h2>
          </div>
          <div style="display: flex;margin-bottom:30px; justify-content:center">
            <pv-input-text id="food" style="width:500px"/>
          </div>
          <div style="display: flex; justify-content:center">
            <br>
            <pv-input-number v-model="value2" showButtons buttonLayout="horizontal"
                             incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" />
          </div>
          <div style="display: flex; justify-content:center;margin-bottom:10px;margin-top:30px">
            <router-link style="text-decoration:none" to="/step-3"> <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold">Siguiente</pv-button> </router-link>
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
export default {
  name: "step-2",
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
  width: 3rem;
}
.punto p{
  text-align: center;
  margin-top: 20%;
}


.line{
  display: flex;
  width: 88%;
  height: 1%;
  margin-top: 2.7%;
  left: 6%;
  margin-right: -50%;
  position: absolute;
  background-color: #D6A049;
  align-items: center;
  border-radius: 1rem;
}

.dot {
  margin-top: 48%;
  height: 50px;
  width: 50px;
  background-color: #f2f2f2;
  z-index: 100;
  border-radius: 100%;
}
.color {
  background-color: #D6A049
}
.container{
  font-family: 'Roboto', sans-serif;
}

</style>