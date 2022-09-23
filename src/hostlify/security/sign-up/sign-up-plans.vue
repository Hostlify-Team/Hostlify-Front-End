<template>
  <pv-card style="margin: 4vh 8vw 3vh 8vw; border-radius: 1rem;">
      <template #content>
        <div class="steps" >
          <h4 style="margin: 0 0 0 0">Paso 1 de 3</h4>
        </div>
        <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
          <h1>Elige tu plan en Hostlify</h1>
        </div>
        <div class="switch" style="margin-bottom: 3rem; display: flex; justify-content: center">
          <pv-select-button v-model="value1" :options="options" aria-labelledby="single" @click="changePlan"/>
        </div>
        <div class="plans">
          <div v-show="defaultPlan" class="default">
            <div class="cards" style="margin-bottom: 3rem; display: flex; justify-content: space-evenly">
              <pv-card style="width: 18em" class="card" >
                <template #header>
                  <div class="solidColor" style="background-color: #FFC286"></div>
                </template>
                <template #content>
                  <div class="content">
                    <h2 style="margin-bottom: 1rem">Standar</h2>
                    <p >30 habitaciones</p>
                    <div class="price">
                      <p style="font-weight: bold">150 S/</p>
                      <p style="font-size: smaller;padding-top: 0.25rem; ">mo*</p>
                    </div>
                    <pv-button style="margin-top: .5em; background-color: #FFC286; color:white">Elegir</pv-button>
                  </div>
                </template>
              </pv-card>
              <pv-card style="width: 18em" class="card" >
                <template #header>
                  <div class="solidColor" style="background-color: #EA9D51"></div>
                </template>
                <template #content>
                  <div class="content">
                    <h2 style="margin-bottom: 1rem">Pro</h2>
                    <p >50 habitaciones</p>
                    <div class="price">
                      <p style="font-weight: bold">250 S/</p>
                      <p style="font-size: smaller;padding-top: 0.25rem; ">mo*</p>
                    </div>
                    <pv-button style="margin-top: .5em; background-color: #EA9D51; color:white">Elegir</pv-button>
                  </div>
                </template>
              </pv-card>
              <pv-card style="width: 18em" class="card" >
                <template #header>
                  <div class="solidColor" style="background-color: #F1C94E"></div>
                </template>
                <template #content>
                  <div class="content">
                    <h2 style="margin-bottom: 1rem">Premium</h2>
                    <p >Ilimitadas habitaciones</p>
                    <div class="price">
                      <p style="font-weight: bold">450 S/</p>
                      <p style="font-size: smaller;padding-top: 0.25rem; ">mo*</p>
                    </div>
                    <pv-button style="margin-top: .5em; background-color: #F1C94E; color:white">Elegir</pv-button>
                  </div>
                </template>
              </pv-card>
            </div>
          </div>
          <div v-show="customPlan" class="custom">
            <div class="cardC" style="margin-bottom: 3rem; display: flex; justify-content: space-evenly">
              <pv-card style="width: 60vw" class="card" >
                <template #header>
                  <div class="solidColor" style="background-color: #D6A049"></div>
                </template>
                <template #content>
                  <div style="display: flex; justify-content: space-evenly">
                    <div class="content" >
                      <h2 style="margin-bottom: 1rem">Plan personalizado</h2>
                      <p >Cuantas habitaciones tienes?</p>
                      <div class="input" >
                        <pv-input-text type="text" class="p-inputtext-lg" style="background-color: white; color: black" v-model="price" />
                      </div>
                    </div>
                    <div class="content" style="display: flex; align-items: center; margin-top: 3rem">
                      <i class="pi pi-arrow-right"></i>
                    </div>
                    <div class="content" >
                      <h2 style="margin-bottom: 1rem">Precios desde S/6.50 por mes</h2>
                      <p >Planes para satisfacer cada etapa de tu hotel</p>
                      <div class="price">
                        <p style="font-weight: bold; font-size: xxx-large">S/{{ price*6.50 }} </p>
                        <p style="padding-top: 0.25rem; margin-top: 2rem" >mo*</p>
                      </div>
                      <pv-button style="margin-top: .5em; background-color: #D6A049; color:white">Elegir</pv-button>
                    </div>
                  </div>
                </template>
              </pv-card>
            </div>
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
      price:0
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
.solidColor{
  height: 2.5rem;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
}
.card{
  border-radius: 1rem;
  background-color: white;
  color: black;
  margin-top: 0;
}
p {
  line-height: 1.5;
  margin-bottom: 0.5rem
}
.content{
  margin-left: 1rem;
}

.price{
  display: flex;
}
</style>