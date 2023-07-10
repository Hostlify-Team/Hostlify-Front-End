<template>
    <div class="card" >
      <pv-card class="SignInCard">
        <template #title>
          <div style="display: flex;justify-content: center">
            <img   src="../../../assets/Logo.png" style="height: 50px;margin-bottom: 2rem"/>
          </div>
          <div class="Text" style="display: flex;justify-content: start; padding-left: 2rem">
            Login
          </div>
          <p style="font-weight: lighter; font-size: 1rem;padding-left: 2rem">
            Bienvenido, Porfavor Inicia sesion.
          </p>
        </template>
        <template #content>
          <div class="form">
            <label >Correo Electronico</label>
            <pv-input-text id="email" class="input" v-model="email" maxlength="256" ></pv-input-text>
            <label style="margin-top: 0.5rem">Contraseña</label>
            <pv-input-text id="password" type="password" class="input" v-model="password"></pv-input-text>
          </div>
          <div class="footer"  >
            <div class="Text" style="font-weight: lighter; font-size: 0.9rem; margin-bottom: 3rem">
              <router-link to="/forgot-password" class="rw">
                ¿Olvidaste tu contraseña?
              </router-link>
            </div>
            <div class="buttons">
              <router-link to="/sign-up-plans" class="rw"><pv-button>Crear Cuenta</pv-button></router-link>
              <pv-button @click="signIn">Iniciar sesion</pv-button>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

</template>

<script>
import {UserServices} from "../../../services/user-services";
import Toast from "primevue/toast";
export default {
  data(){
    return{
      email:"",
      password:""
    }
  },
  methods:{
    signIn(){
      new UserServices().login(this.email,this.password).then(response=>{
        sessionStorage.setItem("jwt",response.data.jwt)
          sessionStorage.setItem("id",response.data.id)
          sessionStorage.setItem("name",response.data.name)
          sessionStorage.setItem("email",response.data.email)
          sessionStorage.setItem("type",response.data.type)
          sessionStorage.setItem("plan",response.data.plan)
          if(response.data.type==="manager"){
              this.sendMessage("manager",response.data.name)
              this.$router.push("/rooms")
          }
          else{
              this.sendMessage("guest",response.data.name)
              this.$router.push("/services")
          }
      }
      ).catch(reason => {
          this.$toast.add({severity:'error', summary: 'Credenciales invalidad', detail:'Correo o contraseña incorrecta', life: 3000});
      })
    },
    sendMessage(type,name){
      let obj={
        logged:true,
        type: type,
        name:name
      }
      this.emitter.emit("message-from-sign-up",obj)
    }
  },
  created() {
    sessionStorage.clear()
    localStorage.clear()
  }
}
</script>

<style scoped>
.form label{
  display: block;
}
.SignInCard{
  width: 10cm;
  border-radius: 0.5rem;
  padding-top: 2rem;
}
.Text{
  text-align: center;
}
.rw{
  color: white;
  text-decoration: none;
}
.card{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 97vh;
}
.form{
  margin: 0 0 0 2rem;
  padding-top: 1rem;
}
.form .input{
  margin: 0.3rem 0;

}
.buttons{
  display: flex;
  margin: 1.3rem 0;
  justify-content: space-around;
}
.footer{
  margin-top: 1rem;
}
.input{
  width: 85%;

}
.font{
  font-family: 'Roboto', sans-serif;
}
</style>