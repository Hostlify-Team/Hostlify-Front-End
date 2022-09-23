<template>
  <pv-card>
    <template #content>
      <div class="steps">
        <h4>Paso 1 de 3</h4>
      </div>
      <div class="phrase">
        <h1>Elige tu plan en Hostlify</h1>
      </div>
      <div class="switch">
        <pv-select-button v-model="value1" :options="options" aria-labelledby="single" @click="changePlan"/>
      </div>
      <div class="plans">
        <div v-show="defaultPlan" class="default">
          Default
        </div>
        <div v-show="customPlan" class="custom">
          Custom
        </div>
      </div>


    </template>
  </pv-card>
</template>

<script>
export default {
  name: "sign-up-plans",
  components: {},

  data(){
    return{
      value1: 'Nuestros Planes',
      options: ['Nuestros Planes', 'Plan personalizado'],
      defaultPlan: true,
      customPlan: false,
    }
  },
  methods:{
    changePlan(){
      if(this.defaultPlan===true){
        this.customPlan=true
        this.defaultPlan=false
      }
      else {
        this.customPlan=false
        this.defaultPlan=true
      }
    }
  }

}
</script>

<style scoped>
</style>