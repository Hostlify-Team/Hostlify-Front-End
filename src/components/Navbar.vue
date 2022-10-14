<template>
  <div v-show="showNavBar">
    <Toolbar>
      <template #start>
        <avatar
            shape="circle"
            image="https://github.com/Hostlify-Team/Hostlify-Landing-Page/blob/main/src/assets/images/Logo.png?raw=true"
            class="mr-2"
        />
        <div v-if="currentUserType==='manager'">
          <router-link class="mr-3 navbar-item" to="/rooms">
            Rooms
          </router-link>
          <router-link class="mr-2 navbar-item" to="/history">
            History
          </router-link>
        </div>
        <div v-else>
          <router-link class="mr-3 navbar-item" to="/services">
            Servicios
          </router-link>
          <router-link class="mr-2 navbar-item" to="/map-hotel">
            Informacion
          </router-link>
          <router-link class="mr-2 navbar-item" to="/SOS">
            Ayuda
          </router-link>
        </div>
      </template>
      <template #end>
        <p style="margin-right: 1rem">Hola {{currentUserName}} !</p>
        <pv-button @click="logOut">
          Cerrar Sesion
        </pv-button>
      </template>
    </Toolbar>
  </div>
</template>


<script>
import Toolbar from 'primevue/toolbar';
import Avatar from 'primevue/avatar';

export default {

  components:{
    Toolbar,
    Avatar,
  },
  data(){
    return{
      showNavBar:false,
      currentUserType:null,
      currentUserName:null
    }
  },
  methods:{
    logOut(){
      localStorage.setItem('type',null)
      this.showNavBar=false
      this.$router.push("/")
      sessionStorage.clear()
    }
  },
  created() {
    if(sessionStorage.getItem("jwt")===null){
      this.showNavBar=false
    }else {
      this.showNavBar=true
      this.currentUserName=sessionStorage.getItem("name")
      this.currentUserType=sessionStorage.getItem("type")
    }

  },
  mounted() {
    this.emitter.on("message-from-sign-up",isOpen=>{
      this.showNavBar=isOpen.logged
      this.currentUserType=isOpen.type
      this.currentUserName=isOpen.name
    })

  }

}
</script>

<style scoped>
  .navbar-item{
    margin: 0 10px;
    text-decoration: none;
    color:#d6a048;
  }
  .navbar-item:visited{
    color:#d6a048;

  }

</style>
