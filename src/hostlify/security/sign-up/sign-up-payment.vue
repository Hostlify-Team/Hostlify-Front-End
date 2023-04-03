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
          <div style=" display: flex; justify-content: center;align-content: center">
            <div>
              <p style="text-align: center">Para obtener el plan {{planString}} debes hacer un deposito de {{mountString}} S/.</p>
              <p style="text-align: center">Escanea este codigo QR </p>
              <div style=" display: flex; justify-content: center;align-content: center">
                <img src="@/assets/QR.png" style="width: 300px;" >
              </div>
              <p style="text-align: center">O deposita a nuestra cuenta bancaria </p>
              <p style="text-align: center" >CC: 0035680103322588744565 </p>
              <p style="text-align: center">Envia la foto de tu comprobante a nuestro correo: Hostlify@gmail.com</p>
              <p style="text-align: center">se enviara un correo con la verificacion de su pago</p>
            </div>
          </div>
          <div class="footer">
            <div class="buttons" >
              <router-link to="/sign-up-payment" class="rw" ><pv-button style="border-radius: 1rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="register">Iniciar subscripcion</pv-button ></router-link>
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
        plan:null,
        planString:null,
        mountString:null
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
      new UserServices().register(this.user.email,this.user.password,this.user.plan,this.user.name,this.user.type).then(response=>{
        localStorage.clear()
        this.$router.push("/")
      }).catch(error=>{
        console.log(error.response)
      })
    }
  },
  created() {
    this.planString=JSON.parse(localStorage.getItem("selectedPlan"))
    if(this.planString==="Premium"){
      this.mountString="400"
    }
    if(this.planString==="Pro"){
      this.mountString="260"
    }
    if(this.planString==="Standard") {
      this.mountString="180"
    }
    if(this.planString==="Custom") {
      this.mountString=JSON.parse(localStorage.getItem("mountPlan"))
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