<template>
  <div class="containerRegister">
    <div class="registerContainer">
      <h1>Registrar Huesped</h1>
      <div class="inputsContainer" v-show="visibleStep">
        <p >Datos del Huesped</p>
        <pv-input-text class="inputRegister" type="text" placeholder="Nombre y apellido*" v-model="name"/>
        <pv-input-text class="inputRegister" type="text" placeholder="Correo Electronico*" v-model="email"/>
        <div style="display: flex;justify-content: space-between">
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="Edad*" />
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="Pais*" />
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="DNI*" />
        </div>
        <pv-input-text class="inputRegister" type="text" placeholder="Contraseña*" v-model="password"/>
        <pv-button class="buttonRegister" style="align-items: end" v-on:click="visibleStep=false">Siguiente</pv-button>
      </div>
      <div class="inputsContainer" v-show="!visibleStep">
        <p >Estadia del Huesped</p>
        <div style="display: flex;justify-content: space-evenly">
          <h3>Precio por dia: </h3>
          <pv-input-text id="price" v-model="price" type="number" style="width: 3rem"></pv-input-text>
          <h3> Soles</h3>
        </div>
        <pv-calendar v-model="endDate" inputId="basic" autocomplete="off" />
        <pv-button class="buttonRegister" style="align-items: end" @click="register">Registrar</pv-button>
        <pv-button class="buttonRegister" style="align-items: end" @click="prueba">Probar progress</pv-button>
      </div>

    </div>
  </div>
</template>

<script>
import {UserServices} from "../services/user-services";
export default {
  name: "Registrar Huesped",
  components: {},

  data(){
    return{
      name:"",
      email:"",
      password:"",
      endDate:null,
      visibleStep:true,
      price:84
    }
  },
  methods:{
    register(){
      new UserServices().register(this.email,this.password,"guest",null,this.name).then(response=>{
        console.log("Register Successfully")
        this.emitter.emit("register-form", false);
        const fecha = new Date();
        let actualDay= fecha.getDate()
        let actualMonth= fecha.getMonth()
        let guest={
          id: response.data.user.id,
          initialDate: actualDay+"/"+(actualMonth+1)+"/"+fecha.getFullYear(),
          endDate:this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear(),
          price: 45,
          progressTime: null,
          lastDay:this.endDate.getDate()
        }
        this.emitter.emit("new-guest", guest);
      })
    },
    prueba(){
        this.emitter.emit("register-form", false);
        const fecha = new Date();
        let actualDay= fecha.getDate()
        let actualMonth= fecha.getMonth()
        let Try={
          initialDate: actualDay+"/"+(actualMonth+1)+"/"+fecha.getFullYear(),
          endDate:this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear(),
          progressTime: null,
          firstDayDate: (actualMonth+1)+"/"+actualDay+"/"+fecha.getFullYear(),
          lastDayDate: (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear(),
        }
        this.emitter.emit("new-Try", Try);
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.containerRegister {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
}
.registerContainer {
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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