<template >
  <div class="card" >
    <pv-card class="SignInCard">
      <template #title >
        <div class="Text">
           {{$t("log in")}}
        </div>
      </template>
      <template #content>
        <div class="form">
          <label for="email">{{$t("email")}}</label>
          <pv-input-text id="email" class="input" v-model="email"></pv-input-text>
          <label for="password">{{$t("password")}}</label>
          <pv-input-text id="password" type="password" class="input" v-model="password"></pv-input-text>
        </div>
        <div class="footer">
          <div class="Text">
            <router-link to="/forgot-password" class="rw">
              {{$t("did you forget")}} <br> {{$t("your password?")}}
            </router-link>
          </div>
          <div class="buttons">
            <router-link to="/sign-up-plans" class="rw"><pv-button>{{$t("create account")}}</pv-button></router-link>
            <pv-button @click="signIn">{{$t("log in")}}</pv-button>
          </div>
        </div>
      </template>
    </pv-card>
    <navbar key="navbarReload"></navbar>
  </div>
</template>

<script>
import {UserServices} from "../../../services/user-services";
import {RoomServices} from "../../../services/room-services";
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
        sessionStorage.setItem("jwt",response.data.accessToken)
        sessionStorage.setItem("id",response.data.user.id)
        sessionStorage.setItem("name",response.data.user.name)
        sessionStorage.setItem("email",response.data.user.email)
        sessionStorage.setItem("type",response.data.user.type)
        sessionStorage.setItem("plan",response.data.user.plan)
        console.log("Ingresaste como: ",response.data.user.type)
        if(response.data.user.type==="manager"){
          this.sendMessage("manager",response.data.user.name)
          this.$router.push("/rooms")
        }else{
          this.sendMessage("guest",response.data.user.name)
          this.$router.push("/services")
        }
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
  }
}
</script>

<style scoped>
.form label{
  display: block;
}
.SignInCard{
  width: 10cm;
  border-radius: 1rem;
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
  height: 100vh;
}
.form{
  margin: 0 0 0 2rem;
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
  width: 85%;

}
</style>