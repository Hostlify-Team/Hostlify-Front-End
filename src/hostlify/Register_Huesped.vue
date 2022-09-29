<template>
  <div class="containerRegister">
    <div class="registerContainer">
      <h1>Registrar Huesped</h1>
      <div class="inputsContainer">
        <pv-input-text class="inputRegister" type="text" placeholder="Nombre y apellido*"/>
        <pv-input-text class="inputRegister" type="text" placeholder="Correo Electronico*" />
        <pv-input-text class="inputRegister" type="text" placeholder="DNI*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Edad*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Pais*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Contraseña*" />
        <pv-button class="buttonRegister">Registrar</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registrar Huesped"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
h1 {
  font-family: 'Roboto', sans-serif;
}

.containerRegister {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #011530;
  height: 100vh;
}
.registerContainer {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #052550;
  margin: 50px 0 50px 0;
  padding: 50px;
  border-radius: 10px;
}
.inputsContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;
}
.buttonRegister {
  width: fit-content;
  padding-left: 50px;
  padding-right: 50px;
  margin-left: auto;
  color: white;
  background-color: #D6A049;
  border-radius: 25px;
}

.inputRegister {
  background-color: white;
  border-radius: 15px;
  color: black;
}
.inputRegister::placeholder {
  color: black;
}

</style>