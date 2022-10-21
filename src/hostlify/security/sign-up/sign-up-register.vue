<template>
  <SwitchButton></SwitchButton>
  <div class="card" style="height: 98vh ">
    <pv-card style=" border-radius: 1rem;justify-content: center;">
      <template #content>
        <div class="content" style="width: 50vw">
          <div class="steps" >
            <h4 style="margin: 0 0 0 2rem">{{$t("step number2")}}</h4>
          </div>
          <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
            <h1>{{$t("create your account")}}</h1>
          </div>
          <div class="card" style="justify-content: center;">
            <div class="register" style="width: 30vw">
              <div class="form" >
                <div class="nombre" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="name" class="input" placeholder="Nombre" style="border-radius: 1rem" v-model="user.name"></pv-input-text>
                </div>
                <div class="email" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="email" class="input" placeholder="Correo Electronico" style="border-radius: 1rem" v-model="user.email"></pv-input-text>
                </div>
                <div class="password" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="password" type="password" class="input" placeholder="Contraseña" style="border-radius: 1rem" v-model="user.password"></pv-input-text>
                </div>
              </div>
              <div class="footer">
                <div class="Text" style="margin: 3rem 0">
                  {{$t("by clicking create account")}}
                  <br>{{$t("privacy of hostlify")}}
                </div>
                <div class="buttons" >
                  <router-link to="/sign-up-payment" class="rw" ><pv-button style="border-radius: 1rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="addTemporaryUser">{{$t("create account")}}</pv-button ></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>
<script>
import SwitchButton from "../../../components/switchButton.vue";

export default {
  name: "sign-up-register",
  data(){
    return{
      user:{
        name:null,
        email:null,
        password:null,
      }
    }
  },
  components:{
    SwitchButton
  },
  methods:{
    addTemporaryUser(){
      console.log("nombre temporalmente guardado: ",this.user.name)
      console.log("nombre temporalmente guardado: ",this.user.email)
      console.log("nombre temporalmente guardado: ",this.user.password)
      localStorage.setItem("user",JSON.stringify(this.user))
    }
  }
}
</script>
<style scoped>
.form label{
  display: block;
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
}
.form{
  margin: 0;
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
  margin-top: 0.5rem;
}
.input{
  width: 100%;
}
</style>