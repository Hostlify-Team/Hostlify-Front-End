<template>
  <div v-show="!$route.meta.hideNavbar">
    <Toolbar>
      <template #start>
        <avatar
            shape="circle"
            image="https://github.com/Hostlify-Team/Hostlify-Landing-Page/blob/main/src/assets/images/Logo.png?raw=true"
            class="mr-2"
        />
        <div v-if="$route.meta.manager">
          <router-link class="mr-3 navbar-item" to="/rooms">
            Rooms
          </router-link>
          <router-link class="mr-2 navbar-item" to="/history">
            History
          </router-link>
        </div>
        <div v-else>
          <router-link class="mr-3 navbar-item" to="/tu-habitacion">
            Tu habitacion
          </router-link>
          <router-link class="mr-2 navbar-item" to="/informacion">
            Informacion
          </router-link>
          <router-link class="mr-2 navbar-item" to="/ayuda">
            Ayuda
          </router-link>
        </div>
      </template>
      <template #end>
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
    }
  },
  methods:{
    logOut(){
      localStorage.setItem('type',null)
      this.$router.push("/")
      sessionStorage.clear()
    },
    getCurrentType(){
      let currentTypeString=sessionStorage.getItem('type');
      if(currentTypeString==='guest'){
        return true
      }else {
        return false
      }
    }
  },
  created() {
    this.getCurrentType()
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
