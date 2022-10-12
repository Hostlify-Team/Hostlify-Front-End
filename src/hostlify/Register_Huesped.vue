<template>
  <div class="containerRegister">
    <div class="registerContainer">
      <h1>Registrar Huesped</h1>
      <div class="inputsContainer" v-show="visibleFormDialog">
        <p >Datos del Huesped</p>
        <pv-input-text class="inputRegister" type="text" placeholder="Nombre y apellido*" v-model="name"/>
        <pv-input-text class="inputRegister" type="text" placeholder="Correo Electronico*" v-model="email"/>
        <div style="display: flex;justify-content: space-between">
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="Edad*" />
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="Pais*" />
          <pv-input-text class="inputRegister" style="width: 28%" type="text" placeholder="DNI*" />
        </div>
        <pv-input-text class="inputRegister" type="text" placeholder="Contraseña*" v-model="password"/>
        <div style="display: flex ;justify-content: end">
          <pv-button class="buttonRegister" style="align-items: end" @click="showDateDialog">Siguiente</pv-button>
        </div>
      </div>
      <div class="inputsContainer" v-show="visibleDateDialog">
        <p >Estadia del Huesped</p>
        <div style="display: flex;justify-content: space-evenly">
          <h3>Precio por dia: </h3>
          <pv-input-text id="price" v-model="price" type="number" style="width: 3rem"></pv-input-text>
          <h3> Soles</h3>
        </div>
        <pv-calendar v-model="endDate" :inline="true" :showWeek="true" />
        <div style="display: flex ;justify-content: end">
          <pv-button class="buttonRegister"  @click="ResumeDialogData">Siguiente</pv-button>
        </div>

      </div>
      <div class="inputsContainer" v-show="visibleResumeDateGuest">
        <h1>Credenciales del usuario</h1>
        <h3 style="margin: 0">Correo: {{email}}</h3>
        <h3 style="margin: 0">Contraseña: {{password}}</h3>
        <h1>Resumen de registro</h1>
        <h4 style="margin: 0">Fecha de ingreso: {{resumeInitialDate}}</h4>
        <h4 style="margin: 0">Fecha de salida: {{resumeEndDate}}</h4>
        <h4 style="margin: 0">Dias totales: {{resumeHotelDays}}</h4>
        <h4 style="margin: 0">Precio total: {{resumePrice}}</h4>
        <div style="display: flex;justify-content: space-around;">
          <pv-button class="buttonRegister"  @click="Cancel">Cancelar</pv-button>
          <pv-button class="buttonRegister"  @click="register">Registrar</pv-button>
        </div>
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
      price:84,
      visibleResumeDateGuest:false,
      visibleFormDialog:true,
      visibleDateDialog:false,
      resumeInitialDate:null,
      resumeEndDate:null,
      resumePrice:null,
      resumeHotelDays:null
    }
  },
  methods:{
    validateCalendarDate(firstDayDate,lastDayDate){
      let day1 = new Date(firstDayDate);
      let day2 = new Date(lastDayDate);

      if((day2.getMonth()+1)<(day1.getMonth()+1) && day2.getFullYear()<=day1.getFullYear() ||
          (day2.getMonth()+1)===(day1.getMonth()+1) && day2.getDate()<day1.getDate() && day2.getFullYear()<=day1.getFullYear()){
        console.log("Elegiste una fecha antigua")
        return false
      }else{
        return true
      }
    },
    getDiferenceDays(firstDayDate,lastDayDate){
      let day1 = new Date(firstDayDate);
      let day2 = new Date(lastDayDate);

      let totalDifference= Math.abs(day2-day1);
      let totalDays = totalDifference/(1000 * 3600 * 24)

      return totalDays
    },
    register(){
      this.resumeDateGuest=false
      const date = new Date();
      let actualDay= date.getDate()
      let actualMonth= date.getMonth()

      let firstDayDate= (actualMonth+1)+"/"+actualDay+"/"+date.getFullYear()
      let lastDayDate= (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear()
      new UserServices().register(this.email,this.password,"guest",null,this.name).then(response=>{
        console.log("Register Successfully")
        this.emitter.emit("register-form", false);
        const date = new Date();
        let actualDay= date.getDate()
        let actualMonth= date.getMonth()
        let guest={
            id: response.data.user.id,
            initialDate: actualDay+"/"+(actualMonth+1)+"/"+date.getFullYear(),
            lastDay:this.endDate.getDate(),
            endDate:this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear(),
            progressTime: null,
            firstDayDate: (actualMonth+1)+"/"+actualDay+"/"+date.getFullYear(),
            lastDayDate: (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear(),
            price: this.setPrice(firstDayDate,lastDayDate),
          }
        this.emitter.emit("new-guest", guest);
      })

    },
    setPrice(firstDayDate,lastDayDate){
      let day1 = new Date(firstDayDate);
      let day2 = new Date(lastDayDate);

      let difference= Math.abs(day2-day1);
      let days = difference/(1000 * 3600 * 24)
      let totalPrice=days*this.price

      return totalPrice
    },
    ResumeDialogData(){
      const date = new Date();
      let actualDay= date.getDate()
      let actualMonth= date.getMonth()
      let firstDayDate= (actualMonth+1)+"/"+actualDay+"/"+date.getFullYear()
      let lastDayDate= (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear()

      if (this.validateCalendarDate(firstDayDate,lastDayDate)){
        this.visibleDateDialog=false
        this.visibleResumeDateGuest=true
        this.resumeInitialDate= actualDay+"/"+(actualMonth+1)+"/"+date.getFullYear()
        this.resumeEndDate=this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear()
        this.resumePrice=this.setPrice(firstDayDate,lastDayDate)
        this.resumeHotelDays=this.getDiferenceDays(firstDayDate,lastDayDate)
      }else{
        this.$toast.add({severity:'error', summary: 'Fecha antigua', detail:'Seleccione una fecha valida', life: 3000});
      }

    },
    Cancel(){
      this.visibleResumeDateGuest=false
      this.visibleFormDialog=true
      this.name=""
      this.email=""
      this.password=""
      this.endDate=null
      this.price=84
      this.resumeDateGuest=false
      this.resumeInitialDate=null
      this.resumeEndDate=null
      this.resumePrice=null
      this.resumeHotelDays=null
    },
    showDateDialog(){
      this.visibleFormDialog=false
      this.visibleDateDialog=true
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