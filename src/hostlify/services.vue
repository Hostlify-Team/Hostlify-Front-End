<template>
  <div class="services">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1>{{$t("services")}}</h1>
    </div>
    <div class="containerA">
      <div class="cardiv">
        <pv-card class="card">
          <template #content>
            <div>
              <div style="display: flex; justify-content: center;margin-top: 3rem;">
                <img src="@/assets/food.png" alt="" class="img">
              </div>
              <div style="display: flex; justify-content: center;margin-top: 4.3rem">
                <h2>{{$t("food service")}}</h2>
              </div>

            </div>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: center">
              <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('step-1')">{{$t("request service")}}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
      <div class="cardiv">
        <pv-card class="card">
          <template #content>
            <di>
              <div style="display: flex; justify-content: center;margin-top: 3rem">
                <img src="@/assets/cleaning.png" alt="" class="img">
              </div>
              <div style="display: flex; justify-content: center">
                <h2>{{$t("room cleaning")}}</h2>
              </div>
            </di>
          </template>
          <template #footer>
            <div style="display: flex; justify-content: center">
              <pv-button style="border-radius: 0.4rem;color: white;background-color: #D6A049;border-color: #D6A049" @click="saveService('clean-room')">{{$t("request service")}}</pv-button>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
    <div class="chatbox">
      <div class="chatbox-toggle" @click="toggleChatbox()">Chat</div>
        <div class="chatbox-content" style="height: 0px; overflow-y: scroll;">
          <div v-for="msg in messages">
            <div class="bubbleBot"  v-if="msg.bot">
              <p style="display: flex;justify-content: center;">{{ msg.text }}</p>
            </div>
            <div class="bubbleGuest" v-if="!msg.bot">
              <p style="display: flex;justify-content: center;">{{ msg.text }}</p>
            </div>
          </div>
        </div>
        <div class="p-inputgroup flex-1" v-show="chat">
          <pv-input-text v-model="message.text" />
          <pv-button icon="pi pi-send" class="p-button-warning" @click="sendMessage()"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "services",
  data(){
    return{
      showChatbox: false,
      message: {},
      messages:[],
      chat:false
    }
  },
  created() {
    this.message.bot=true
    this.message.text="¡Bienvenido! ¿En qué puedo ayudarte?"
    this.messages.push(this.message)
    this.message={}
    this.message.text="Hola, tengo una pregunta sobre los servicios ofrecidos."
  },
  methods:{
    saveService(type){
      console.log(type)
      localStorage.setItem("service",type)
      this.$router.push("/"+type)
    },
    toggleChatbox() {
      var chatboxContent = document.querySelector('.chatbox-content');
      chatboxContent.style.height = chatboxContent.style.height === '0px' ? '300px' : '0';
      if(this.chat===false){this.chat=true}
      else {this.chat=false}
    },
    sendMessage(){
      this.message.bot=false
      this.messages.push(this.message)
      this.botResponse(this.message.text)

    },
    botResponse(text){
      this.message={}
      this.message.bot=true
      this.message.text=this.responseForText(text)
      this.messages.push(this.message)
      this.message={}
    },
     responseForText(texto) {
       const palabrasClaveComida = ["comida","platillo","comer","plato","alimento","bebidas"];
       const palabrasClaveLimpieza = ["limpieza","limpiar","limpie","sucio","limpien","limpiesa"];
       const palabrasClaveEmergencia = ["emergencia","ayuda","911","sangre","herido"];
       const palabrasClaveMapa = ["mapa","instalaciones","ubicacion","pisos","ubicado","infraestructura"];
       const palabrasServicio = ["servicio","habitacion"];
       const palabrasDespedida = ["agradecer", "gracias", "muchas gracias", "te agradezco", "genial", "excelente", "perfecto", "maravilloso", "fantástico", "buen trabajo", "bravo",];

       texto = texto.toLowerCase();
       palabrasClaveComida.map(palabra => palabra.toLowerCase());
       palabrasClaveLimpieza.map(palabra => palabra.toLowerCase());
       palabrasClaveEmergencia.map(palabra => palabra.toLowerCase());
       palabrasClaveMapa.map(palabra => palabra.toLowerCase());
       palabrasServicio.map(palabra => palabra.toLowerCase());
       palabrasDespedida.map(palabra => palabra.toLowerCase());

       const palabraEncontradaServicio = palabrasServicio.some(palabra => texto.includes(palabra));
       const palabraEncontradaComida = palabrasClaveComida.some(palabra => texto.includes(palabra));
       const palabraEncontradaLimpieza = palabrasClaveLimpieza.some(palabra => texto.includes(palabra));
       const palabraEncontradaEmergencia = palabrasClaveEmergencia.some(palabra => texto.includes(palabra));
       const palabraEncontradaMapa = palabrasClaveMapa.some(palabra => texto.includes(palabra));
       const palabraEncontradaDespedidad = palabrasDespedida.some(palabra => texto.includes(palabra));

       // Retornar un mensaje dependiendo del resultado
       if (palabraEncontradaServicio) {
         if (palabraEncontradaComida) {
           return "Comida";
         }
         if (palabraEncontradaLimpieza) {
           return "Limpieza";
         }
         if (palabraEncontradaEmergencia) {
           return "Emergencia";
         }
         if (palabraEncontradaMapa) {
           return "Mapa";
         }
         else {
           return "servicios generales"
         }
       }
       if (palabraEncontradaComida) {
         return "Comida";
       }
       if (palabraEncontradaLimpieza) {
         return "Limpieza";
       }
       if (palabraEncontradaEmergencia) {
         return "Emergencia";
       }
       if (palabraEncontradaMapa) {
         return "Mapa";
       }else {
         if (palabraEncontradaDespedidad) {
           return "Encantado de ayudarte";
         }
       }
    }
}
}
</script>

<style scoped>
.containerA{
  display: flex;
  justify-content: space-evenly;
  padding-top: 5rem
}
.services{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
}
.card{
  width: 22rem;
  border-radius: 1rem;
  height: 32rem
}
.img{
  width: 16rem;border-radius: 1rem
}

@media (max-width:800px){
  .containerA{
    display: block;
    justify-content: center;
    align-items: center;

  }
  .cardiv{
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }
}
.chatbox {
  position: fixed;
  right: 20px;
  bottom: 0px;
  width: 350px;
  border: 1px solid #000000;
  border-radius: 5px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.chatbox-toggle {
  background-color: #2d2d2d;
  color: #fff;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.chatbox-content {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  background-color: #111111;
  display: inline-block;
}
.bubbleBot {
  background-color: #F0F0F0;
  color: #000000;
  padding: 0.5px 5px;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 40px;
  margin-left: 0px;
  margin-bottom: 10px;
}

.bubbleGuest {
  background-color: #D6A049;
  color: #FFFFFF;
  padding: 0.5px 5px;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 0px;
  margin-left: 40px;
  margin-bottom: 10px;
}

.chat-input {
  position: sticky;
  bottom: 0;
  background-color: #111111;
  padding: 10px;
  display: flex;
  align-items: center;
}

.chat-input .p-inputgroup {
  flex: 1;
  margin-right: 10px;
}

</style>