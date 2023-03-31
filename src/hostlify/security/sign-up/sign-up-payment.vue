<template>
  <div class="card" style="height: 98vh ">
    <pv-card style=" border-radius: 1rem;justify-content: center;">
      <template #content>
        <div class="content" style="width: 50vw">
          <div class="steps" >
            <h4 style="margin: 0 0 0 2rem">Paso 3 de 3</h4>
          </div>
          <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
            <h1>Agrega un metodo  de pago</h1>
          </div>
          <div class="card" style="justify-content: center;">
            <div class="register" style="width: 30vw;">
              <div class="form" >
                <div class="Text" style="margin-top: 3rem">
                  <p>Elige un método de pago, completa la información e inicia tu suscripción</p><br>
                  <div class="paycards" style="display: flex; align-items: center;justify-content: center">
                    <img src="@/assets/visa.png" alt="" style="width: 50px">
                    <img src="@/assets/MasterCard.png" alt="" style="width: 50px">
                    <img src="@/assets/AmericanEXPRESS.png" alt="" style="width: 40px">
                    <img src="@/assets/DinersClub.jpg" alt="" style="width: 78px">
                  </div>
                </div>
                <div class="fullname" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="fullname" class="input" placeholder="Nombre y apellido" style="border-radius: 1rem"></pv-input-text>
                </div>
                <div class="paycard" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="paycard" class="input" placeholder="Numero de tarjeta" type="number" style="border-radius: 1rem"></pv-input-text>
                </div>
                <div class="Codes" style="display: flex; justify-content: space-between; margin: 1rem 0">
                  <pv-input-mask id="ExpirationCode" placeholder="Fecha de expiracion" mask="99/99" style="border-radius: 1rem;width: 14vw"></pv-input-mask>
                  <pv-input-mask id="SecurityCode" placeholder="Codigo de seguridad" mask="999" style="border-radius: 1rem;width: 14vw"></pv-input-mask>
                </div>
              </div>
              <div class="footer">
                <div class="buttons" >
                  <router-link to="/sign-up-payment" class="rw" ><pv-button style="border-radius: 1rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="register">Iniciar subscripcion</pv-button ></router-link>
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
import {UserServices} from "@/services/user-services";

export default {
  name: "sign-up-payment",
  data(){
    return{
      user:{
        type:null,
        name:null,
        email:null,
        password:null,
        plan:null
      }
    }
  },
  methods:{
    register(){
      let userInfo =localStorage.getItem("user")
      if(userInfo!=null){
        this.user=JSON.parse(userInfo)
      }
      this.user.plan=JSON.parse(localStorage.getItem("selectedPlan"))
      this.user.type="manager"
      console.log("Usuario:",this.user)
      new UserServices().register(this.user.email,this.user.password,this.user.plan,this.user.name).then(response=>{
        localStorage.clear()
        this.$router.push("/")
      }).catch(error=>{
        console.log(error.response)
      })
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
.paycards img{
  margin-right: 0.5rem;
}
</style>