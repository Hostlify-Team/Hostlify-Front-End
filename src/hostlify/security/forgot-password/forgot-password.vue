<template>
  <SwitchButton></SwitchButton>
  <div class="card" >
    <pv-card class="ForgotPasswordCard">
      <template #title >
        <div class="Text">
          {{$t("ResetPassword")}}
        </div>
      </template>
      <template #content>
        <div class="form">
          <label for="user">{{$t("email")}}</label>
          <pv-input-text id="user" class="input"></pv-input-text>
        </div>
        <div class="footer">
          <div class="buttons">
            <pv-button @click="showDialog">{{$t("send")}}</pv-button>
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
import SwitchButton from "../../../components/switchButton.vue";
export default {
  name: "forgot-password",
  components:{
    SwitchButton
  },
  data(){
    return{
      confirmDialog: false,

    }
  },
  methods:{
    showDialog(){
      this.confirmDialog=true;
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