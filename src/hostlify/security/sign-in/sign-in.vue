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
            <label for="user">Usuario</label>
            <pv-input-text id="user" class="input"></pv-input-text>
            <label for="password">contraseña</label>
            <pv-input-text id="password" type="password" class="input"></pv-input-text>
          </div>
          <div class="footer">
            <div class="Text">
              <router-link to="/" class="rw">
                ¿Olvidaste tu <br> contraseña?
              </router-link>
            </div>
            <div class="buttons">
              <pv-button>Crear Cuenta</pv-button>
              <pv-button>Iniciar sesion</pv-button>
            </div>
          </div>
        </template>



      </pv-card>
  </div>
</template>

<script>
export default {
  name: "sign-in",
  components: {},

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