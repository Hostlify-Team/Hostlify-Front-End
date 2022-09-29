<template>
  <pv-toast></pv-toast>
  <pv-button @click="mounted">Click on me</pv-button>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    mounted() {
      this.$toast.add({severity:'success', summary: 'Success Message', detail:'Im a toast', life: 3000});
    }
  }
}
</script>
