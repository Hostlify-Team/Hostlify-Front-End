
<template>
  <Toolbar>
    <template #start>
      <avatar
          shape="circle"
          image="https://github.com/Hostlify-Team/Hostlify-Landing-Page/blob/main/src/assets/images/Logo.png?raw=true"
          class="mr-2"
      />
      <div v-if="isAdmin === false">
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

      <div v-else>
        <router-link class="mr-3 navbar-item" to="/rooms">
          Rooms
        </router-link>
        <router-link class="mr-2 navbar-item" to="/history">
          History
        </router-link>
      </div>
    </template>

    <template #end>
      <router-link class="mr-2 navbar-item" to="#">
        Hola Diego!
      </router-link>
      <router-link class="mr-2 navbar-item" to="#">
        Cerrar Sesion
      </router-link>
    </template>
  </Toolbar>
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
      isAdmin:false,

    }
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
