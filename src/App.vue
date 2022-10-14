<script>
  import Navbar from "../src/components/Navbar.vue";
 export default {
   components:{
       Navbar,
   }
 }
</script>

<template>
  <pv-toast></pv-toast>
  <Navbar/>
  <RouterView />
</template>

