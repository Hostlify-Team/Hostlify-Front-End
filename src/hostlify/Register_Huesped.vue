<template>
  <div class="containerRegister">
    <div class="registerContainer">
      <h1>Registrar Huesped</h1>
      <div class="inputsContainer">
        <pv-input-text class="inputRegister" type="text" placeholder="Nombre y apellido*" v-model="name"/>
        <pv-input-text class="inputRegister" type="text" placeholder="Correo Electronico*" v-model="email"/>
        <pv-input-text class="inputRegister" type="text" placeholder="DNI*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Edad*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Pais*" />
        <pv-input-text class="inputRegister" type="text" placeholder="Contraseña*" v-model="password"/>
        <pv-button class="buttonRegister" @click="register">Registrar</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
import {UserServices} from "../services/user-services";
export default {
  name: "Registrar Huesped",
  data(){
    return{
      name:"",
      email:"",
      password:""
    }
  },
  methods:{
    register(){
      new UserServices().register(this.email,this.password,"guest",null,this.name).then(response=>{
        console.log("Register Successfully")
        this.emitter.emit("register-form", false);
        let today = new Date();
        let guest={
          id: response.data.user.id,
          date: today.toLocaleDateString('en-US'),
          price: 45,
          time: 10
        }
        this.emitter.emit("new-guest", guest);
      })
    }
  }
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
}
.registerContainer {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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