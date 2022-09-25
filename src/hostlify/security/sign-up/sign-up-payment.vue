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
                <div class="nombre" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="name" class="input" placeholder="Nombre y apellido" style="border-radius: 1rem"></pv-input-text>
                </div>
                <div class="email" style="display: flex; justify-content: center; margin: 1rem 0">
                  <pv-input-text id="email" class="input" placeholder="Numero de tarjeta" style="border-radius: 1rem"></pv-input-text>
                </div>
                <div class="password" style="display: flex; justify-content: space-between; margin: 1rem 0">
                  <pv-input-text class="input" placeholder="Fecha de expiracion*" style="border-radius: 1rem;width: 14vw"></pv-input-text>
                  <pv-input-text class="input" placeholder="Codigo de seguridad*" style="border-radius: 1rem;width: 14vw"></pv-input-text>
                </div>
              </div>
              <div class="footer">
                <div class="buttons" >
                  <router-link to="/sign-up-payment" class="rw" ><pv-button style="border-radius: 1rem">Iniciar subscripcion</pv-button ></router-link>
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
export default {
  name: "sign-up-payment"
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
