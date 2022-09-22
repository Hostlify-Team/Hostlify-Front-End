<template>
  <div class="card" >
    <pv-card class="ForgotPasswordCard">
      <template #title >
        <div class="Text">
          Recuperar Contraseña
        </div>
      </template>
      <template #content>
        <div class="form">
          <label for="user">Correo Electronico</label>
          <pv-input-text id="user" class="input"></pv-input-text>
        </div>
        <div class="footer">
          <div class="buttons">
            <pv-button>Enviar</pv-button>
          </div>
        </div>
      </template>



    </pv-card>
  </div>
</template>

<script>
export default {
  name: "forgot-password"
}
</script>

<style scoped>
.form label{
  display: block;
}
.ForgotPasswordCard{
  width: 10cm;
  border-radius: 1rem;
  padding-top: 2rem;
}
.Text{
  text-align: center;
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