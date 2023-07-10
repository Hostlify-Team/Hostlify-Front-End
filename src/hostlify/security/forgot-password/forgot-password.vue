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
          <pv-input-text id="user" class="input" maxlength="256" @input="actualizarEstadoBoton()" v-model="email"></pv-input-text>
        </div>
        <div class="footer">
          <div class="buttons">
              <pv-button  @click="goBack">Regresar</pv-button>
            <pv-button :disabled="!esFormularioCompleto"  @click="sendEmail">Enviar</pv-button>

          </div>
        </div>
      </template>
    </pv-card>
    <pv-dialog header="Solicitud enviada" v-model:visible="confirmDialog"  :style="{width: '30vw'}" :modal="true">
      <p class="m-0">Si existe alguna cuenta registrada con este correo electronico se le enviara un correo</p>
      <template #footer>
        <pv-button label="Entendido" @click="closeDialog" />
      </template>
    </pv-dialog>
  </div>
</template>

<script>
export default {
  name: "forgot-password",
  data(){
    return{
      confirmDialog: false,
        esFormularioCompleto: false,
        email:null
    }
  },
  methods:{
    sendEmail(){
        const arrobaCount = (this.email.split("@").length - 1);
        const dotCount = (this.email.split(".").length - 1);
        if (this.validarEmail(this.email)&& this.email.includes('@') && this.email.toString().includes('.') && arrobaCount===1 && dotCount===1) {
            this.confirmDialog=true;
        } else {
            this.$toast.add({severity:'info', summary: 'Email invalido', detail:'Se debe ingresar un correo valido', life: 3000});
        }

    },
      goBack(){
          this.$router.push("/")
      },
    validarEmail(email) {
        const extensionesValidas = /(com|net|org)$/i;
        return extensionesValidas.test(email);
    },
      actualizarEstadoBoton() {
        this.esFormularioCompleto = (this.email.length >0);
      },
    closeDialog(){
      this.confirmDialog=false;
      this.$router.push("/")
    }
  }

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