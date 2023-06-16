<template>
  <div v-show="showNavBar" class="navbar">
    <Toolbar>
      <template #start>
          <img   src="../../src/assets/Logo.png" style="height: 35px"/>
        <div v-if="currentUserType==='manager'">
          <router-link class="mr-3 navbar-item" to="/rooms">
            {{$t("rooms")}}
          </router-link>
          <router-link class="mr-2 navbar-item" to="/history">
            {{$t("history")}}
          </router-link>
          <router-link class="mr-2 navbar-item" to="/update-Plan">
            {{$t("plans")}}
          </router-link>
        </div>
        <div v-else>
          <router-link class="mr-3 navbar-item" to="/services">
            {{$t("services")}}
          </router-link>
          <router-link class="mr-2 navbar-item" to="/map-hotel">
            {{$t("information")}}
          </router-link>
          <router-link class="mr-2 navbar-item" to="/SOS">
            {{$t("help")}}
          </router-link>
        </div>
      </template>
      <template #end>
        <pv-select-button v-model="$i18n.locale" :options="languages" aria-labelledby="single" style="margin-right: 2rem">

        </pv-select-button>
        <p style="margin-right: 1rem">{{$t("hello")}} {{currentUserName}} !</p>
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
      currentUserName:null,
      languages: ['es', 'en']
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
