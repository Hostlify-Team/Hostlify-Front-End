<template>
  <div class="services">
    <div class="chatbox">
      <div class="chatbox-toggle" @click="toggleChatbox()">Chat</div>
      <div class="chatbox-content" style="height: 0px; overflow-y: scroll;">
        <div v-for="msg in messages">
          <div class="bubbleBot"  v-if="msg.bot">
            <p style="display: flex;justify-content: center;" @click="navigate" >{{ msg.text }} </p>
          </div>
          <div class="bubbleGuest" v-if="!msg.bot">
            <p style="display: flex;justify-content: center;">{{ msg.text }}</p>
          </div>
        </div>
      </div>
      <div class="p-inputgroup flex-1" v-show="chat">
        <pv-input-text @input="isChatTextComplete" v-model="message.text" :maxlength="35"/>
        <pv-button :disabled="!activeSendMessage" icon="pi pi-send" class="p-button-warning" @click="sendMessage()"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBox",
  data(){
    return{
      showChatbox: false,
      message: {},
      messages:[],
      chat:false,
      activeSendMessage:true,
      link:""
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
      if(this.message.text!=="null"){
        this.messages.push(this.message)
        this.message={}
      }
      this.message={}
      this.activeSendMessage =false
    },
    isChatTextComplete(){
      this.activeSendMessage = (this.message.text.length>0);
    },
    responseForText(texto) {
      this.message.link=false
      const palabrasClaveComida = ["comida", "platillo", "comer", "plato", "alimento", "bebidas", "restaurante", "cena", "desayuno", "almuerzo", "gourmet", "sabroso", "delicioso", "sabor", "menu", "chef", "cocina", "ingredientes", "gastronomía",];
      const palabrasClaveLimpieza = ["limpieza", "limpiar", "limpie", "sucio", "limpien", "limpiesa", "aseo", "asear", "aseando", "aseada", "orden", "aseado", "higiene", "pulcro", "impecable", "lavar", "asegurar", "desinfectar", "barrer"];
      const palabrasClaveEmergencia = ["emergencia", "ayuda", "911", "sangre", "herido", "accidente", "urgente", "desastre", "desmayo", "lesion", "rescate", "primeros auxilios", "socorro", "quemadura", "infarto", "paro cardíaco", "asistencia", "evacuacion"];
      const palabrasClaveMapa = ["mapa", "instalaciones", "ubicacion", "pisos", "ubicado", "infraestructura", "plano", "direccion", "sitio", "navegacion", "orientacion", "recorrido", "ruta", "explorar", "localizar", "puntos de interes", "guiar", "acceso", "como llegar"];
      const palabrasServicio = ["servicio", "habitacion", "alojamiento", "reserva", "estancia", "habitaciones", "hotel", "alojamiento", "huespedes", "servicios", "instalaciones", "comodidades", "amenidades", "confort", "suites", "reservaciones", "alojar", "hospedaje", "alojarse", "hospedarse"];
      const palabrasDespedida = ["agradecer", "gracias", "muchas gracias", "te agradezco", "genial", "excelente", "perfecto", "maravilloso", "fantastico", "buen trabajo", "bravo", "hasta luego", "adios", "nos vemos", "hasta pronto", "cuidate", "buen día", "buena noche", "que tengas un buen día", "que tengas una buena noche", "que estes bien", "que te vaya bien"];
      const palabrasClaveSaludo = ["que haces","hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "¡hola!", "¡buenos días!", "¡buenas tardes!", "¡buenas noches!", "¡saludos!", "que tal", "cómo estas", "como te va", "cómo ha sido tu día", "espero que estes bien", "hola, ¿como estas?", "buen dia", "buena tarde", "buena noche"];

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
      const palabraEncontradaSaludo = palabrasClaveSaludo.some(palabra => texto.includes(palabra));

      // Retornar un mensaje dependiendo del resultado
      if (palabraEncontradaServicio) {
        if (palabraEncontradaComida) {
          this.link="/step-1"
          return "Puedes solicitar tu servicio de comida haciendo click aqui";
        }
        if (palabraEncontradaLimpieza) {
          this.link="/clean-room"
          return "Puedes solicitar tu servicio de limpieza haciendo click aqui";
        }
        if (palabraEncontradaEmergencia) {
          this.link="/SOS"
          return "Puedes navegar a la alarma de emergencia haciendo click aqui";
        }
        if (palabraEncontradaMapa) {
          this.link="/map-hotel"
          return "Puedes acceder al mapa del hotel click aqui";
        }
        else {
          return "Veo que quieres solicitar un servicio, indicame cual servicio deseas obtener"
        }
      }
      if (palabraEncontradaSaludo) {
        if (palabraEncontradaComida) {
          this.link="/step-1"
          return "¡Hola! puedes solicitar tu servicio de comida haciendo click aqui";
        }
        if (palabraEncontradaLimpieza) {
          this.link="/clean-room"
          return "¡Hola! puedes solicitar tu servicio de limpieza haciendo click aqui";
        }
        if (palabraEncontradaEmergencia) {
          this.link="/SOS"
          return "¡Hola! puedes navegar a la alarma de emergencia haciendo click aqui";
        }
        if (palabraEncontradaMapa) {
          this.link="/map-hotel"
          return "¡Hola! puedes acceder al mapa del hotel click aqui";
        }
        else {
          return "¡Hola! ¿En qué puedo ayudarte?"
        }
      }
      if (palabraEncontradaComida) {
        this.link="/step-1"
        return "Puedes solicitar tu servicio de comida haciendo click aqui";
      }
      if (palabraEncontradaLimpieza) {
        this.link="/clean-room"
        return "Puedes solicitar tu servicio de limpieza haciendo click aqui";
      }
      if (palabraEncontradaEmergencia) {
        this.link="/SOS"
        return "Puedes navegar a la alarma de emergencia haciendo click aqui";
      }
      if (palabraEncontradaMapa) {
        this.link="/map-hotel"
        return "Puedes acceder al mapa del hotel click aqui";
      }else {
        if (palabraEncontradaDespedidad) {
          return "Encantado de ayudarte";
        }
        else {
          return "null"
        }
      }
    },
    navigate(){
      console.log("NAVEGO")
      this.$router.push(this.link)
      this.link=""
    }
  }
}
</script>

<style scoped>

.services{
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
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


.chat-input .p-inputgroup {
  flex: 1;
  margin-right: 10px;
}
</style>