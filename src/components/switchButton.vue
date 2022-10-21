<template>
  <div style="display: flex;justify-content: end">
    <pv-select-button v-model="$i18n.locale" :options="languages" aria-labelledby="single" style="margin-right: 2rem"/>
  </div>
</template>

<script>
export default {
  name: "switchButton",
  data(){
    return{
      languages: ['es', 'en']
    }
  }
}
</script>

<style scoped>

</style>