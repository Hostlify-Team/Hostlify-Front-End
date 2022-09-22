<template>
  <div class="card">
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
            <label for="password">Contraseña</label>
            <pv-password id="password" class="input"></pv-password>
          </div>
        </template>
        <template #footer>
          <div class="Text">
            ¿Olvidaste tu contraseña?
          </div>
          <div class="buttons">
            <pv-button>Crear Cuenta</pv-button>
            <pv-button>Iniciar sesion</pv-button>
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
.card{
  left      : 50%;
  top       : 50%;
  position  : absolute;
  transform : translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

}
.form{
  margin: 0 0 0 2rem;
}
.form .input{
  width: 100%;
}
.buttons{
  display: flex;
  margin: 2rem 0;
  justify-content: space-around;
  }

</style>