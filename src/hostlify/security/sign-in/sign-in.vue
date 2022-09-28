<template >
  <div class="card" >
    <pv-card class="SignInCard">
      <template #title >
        <div class="Text">
          Iniciar sesion
        </div>
      </template>
      <template #content>
        <div class="form">
          <label for="email">Correo Electronico</label>
          <pv-input-text id="email" class="input"></pv-input-text>
          <label for="password">contraseña</label>
          <pv-input-text id="password" type="password" class="input"></pv-input-text>
        </div>
        <div class="footer">
          <div class="Text">
            <router-link to="/forgot-password" class="rw">
              ¿Olvidaste tu <br> contraseña?
            </router-link>
          </div>
          <div class="buttons">
            <router-link to="/sign-up-plans" class="rw"><pv-button>Crear Cuenta</pv-button></router-link>
            <pv-button>Iniciar sesion</pv-button>
          </div>
          <div>
            <p style="text-align: center">Inicio de sesion provisional</p>
            <div style="display: flex; justify-content: space-evenly">
              <pv-button @click="fakeSignIn('manager')">Manager</pv-button>
              <pv-button @click="fakeSignIn('guest')">Guest</pv-button>
            </div>

          </div>
        </div>
      </template>



    </pv-card>
    <navbar key="navbarReload"></navbar>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  data(){
    return{
    }
  },
  methods:{
    fakeSignIn(usertype){
      localStorage.setItem("type",usertype)
      if(usertype==='manager'){
        this.$router.push("/about")
      }
      else {
        this.$router.push("/services")
      }
    }
  },
  created() {
    localStorage.setItem("type",null)
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