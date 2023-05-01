<template>
  <div class="card" style="height: 98vh ">
    <pv-card style=" border-radius: 1rem;justify-content: center;">
      <template #content>
        <div class="content" style="width: 50vw">
          <div class="steps" >
            <h4 style="margin: 0 0 0 2rem">Paso 2 de 3</h4>
          </div>
          <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
            <h1>Crea tu cuenta</h1>
          </div>
          <div class="card" style="justify-content: center;">
            <div class="register" style="width: 30vw">
              <div class="form" >
                <div class="nombre" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="name" class="input" @input="actualizarEstadoBoton()" placeholder="Nombre" style="border-radius: 1rem" v-model="user.name" maxlength="56" @keypress="validarNombre($event)"></pv-input-text>
                </div>
                <div class="email" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="email" class="input" @input="actualizarEstadoBoton()" placeholder="Correo Electronico" style="border-radius: 1rem" maxlength="256" v-model="user.email"></pv-input-text>
                </div>
                <div class="password" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="password" type="password" class="input" @input="actualizarEstadoBoton()" placeholder="Contraseña" style="border-radius: 1rem" v-model="user.password"></pv-input-text>
                </div>
              </div>
              <div class="footer">
                <div class="Text" style="margin: 3rem 0">
                  Al crear mi cuenta acepto las condiciones del servicio y la politica
                  <br>de privacidad de Hostlify
                </div>
                <div class="buttons" >
                  <pv-button :disabled="!esFormularioCompleto" style="border-radius: 1rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="addTemporaryUser()">Crear Cuenta</pv-button >
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
import Toast from "primevue/toast";

export default {
  name: "sign-up-register",
  data(){
    return{
      user:{
        name:null,
        email:null,
        password:null,
      },
      esFormularioCompleto: false
    }
  },
  methods:{
    actualizarEstadoBoton() {
      this.esFormularioCompleto = (this.user.name.length>0 && this.user.email.length >0 && this.user.password.length >0);
    },
    addTemporaryUser(){
      if (this.user.email.includes('@') && this.user.email.toString().includes('.')) {
        localStorage.setItem("user",JSON.stringify(this.user))
        this.$router.push("/sign-up-payment")
      } else {
        this.$toast.add({severity:'info', summary: 'Email invalido', detail:'Se debe ingresar un correo valido', life: 3000});
      }

    },
    validarNombre(evento) {
      const codigo = evento.keyCode || evento.which;
      const caracter = String.fromCharCode(codigo);
      const patron = /^[a-zA-Z\s]*$/; // Patrón para permitir solo letras y espacios

      if (caracter.match(patron)) {
        return true;
      } else {
        evento.preventDefault();
        return false;
      }
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