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
        <span class="color dot"></span>
        <p>Seleción de platillo</p>
      </div>
      <div class="punto">
        <span class="color dot"></span>
        <p>Seleción de platillo</p>
      </div>
    </div>

    <div class="container" style="display: flex; justify-content: space-around; height: 100vh; align-items: center;padding: 0 5rem">
      <pv-card style="width: 50vw; border-radius: 1rem">
        <template #content>
          <div style="display: flex; justify-content:center">
            <h1>¿Confirmar compra?</h1>
          </div>

          <div style="display: flex; justify-content:center;margin-bottom:10px;margin-top:30px">
            <router-link style="text-decoration:none" to="/services"> <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold">Siguiente</pv-button> </router-link>
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
  name: "step-4",
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
.color {
  background-color: #D6A049
}
.container{
  font-family: 'Roboto', sans-serif;
}

</style>