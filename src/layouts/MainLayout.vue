<template>
  <div class="main-layout">
    <router-view>
      <Navbar></Navbar>
    </router-view>
  </div>
</template>

<script>
  import Navbar from "../components/Navbar.vue";

  export default{
    components:{
      Navbar,
    }
  }
</script>
