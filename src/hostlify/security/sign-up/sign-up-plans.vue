<template>
  <div style="height: 98vh ;margin: 0;display:flex; justify-content: center; align-items: center;">
      <pv-card style=" border-radius: 1rem;justify-content: center;width: 70vw;">
        <template #content>
          <div>
            <div class="steps" >
              <h4 style="margin: 0 0 0 2rem">Paso 1 de 3</h4>
            </div>
            <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center">
              <h1>Elige tu plan en Hostlify</h1>
            </div>
            <div class="switch" style="margin-bottom: 3rem; display: flex; justify-content: center">
              <pv-select-button v-model="value1" :options="options" aria-labelledby="single" @click="changePlan"/>
            </div>
            <div class="plans">
              <div v-show="defaultPlan" class="default">
                <div class="cards" style="margin-bottom: 3rem; display: flex; justify-content: space-evenly;">
                  <div v-for="plan in plans">
                    <pv-card style="width: 18em;" class="card">
                      <template #header>
                        <div class="solidColor" v-if="plan.name==='Standard'" style="background-color: #FFC286"></div>
                        <div class="solidColor" v-if="plan.name==='Pro'" style="background-color: #EA9D51"></div>
                        <div class="solidColor" v-if="plan.name==='Premium'" style="background-color: #F1C94E"></div>
                      </template>
                      <template #content>
                        <div class="content">
                          <h2 style="margin-bottom: 0.5rem">{{plan.name}}</h2>
                          <template v-if="plan.rooms!==null" >
                            <p style="margin-top: 6px">Este plan te permite tener hasta</p>
                            <p style="margin-top: 6px">{{plan.rooms}} habitaciones</p>
                          </template>
                          <template v-else >
                            <p style="margin-top: 6px">Este plan te permite tener </p>
                            <p style="margin-top: 6px">infinitas habitaciones</p>
                          </template>
                          <div class="price">
                            <p style="font-weight: bold; margin-top: 8px">{{ plan.price }} S/</p>
                            <div style="display: table;">
                              <p style="margin: 0;padding: 0 0 0.45rem 0.1rem ;align-items: end ;display: table-cell;vertical-align: bottom; color: darkgrey" >mo*</p>
                            </div>
                          </div>
                          <pv-button v-if="plan.name==='Standard'" style="margin-top: .5em; background-color: #FFC286; color:white" @click="planSelected(plan.price)">Elegir</pv-button>
                          <pv-button v-if="plan.name==='Pro'" style="margin-top: .5em; background-color: #EA9D51; color:white" @click="planSelected(plan.price)">Elegir</pv-button>
                          <pv-button v-if="plan.name==='Premium'" style="margin-top: .5em; background-color: #F1C94E; color:white" @click="planSelected(plan.price)">Elegir</pv-button>
                        </div>
                      </template>
                    </pv-card >
                  </div>
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
                          <p style="margin-bottom: 1.1rem">Cuantas habitaciones tienes?</p>
                          <div class="input" >
                            <pv-input-text type="number" style="background-color: white; color: black" v-model="customPlanPrice" />
                          </div>
                        </div>
                        <div class="content" style="display: flex; align-items: center; margin-top: 3rem">
                          <i class="pi pi-arrow-right"></i>
                        </div>
                        <div class="content" >
                          <h2 style="margin-bottom: 1rem">Precios desde S/6.50 por mes</h2>
                          <p style="margin-bottom: 0">Planes para satisfacer cada etapa de tu hotel</p>
                          <div class="price">
                            <p style="font-weight: bold; font-size: 3rem; margin: 0">S/{{ customPlanPrice*6.50 }} </p>
                            <div style="display: table;">
                              <p style="margin: 0;padding: 0 0 0.5rem 0.5rem ;align-items: end ;display: table-cell;vertical-align: bottom;color: darkgrey" >mo*</p>
                            </div>
                          </div>
                          <pv-button style="margin-top: .5em; background-color: #D6A049; color:white" @click="planSelected(customPlanPrice*6.50)">Elegir</pv-button>
                        </div>
                      </div>
                    </template>
                  </pv-card>
                </div>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
  </div>
</template>

<script>
import {PlansServices} from "../../../services/plans-services";
export default {
  name: "sign-up-plans",
  components: {},
  data(){
    return{
      value1: 'Nuestros Planes',
      options: ['Nuestros Planes', 'Plan personalizado'],
      defaultPlan: true,
      customPlan: false,
      customPlanPrice:null,
      plans:null

    }
  },
  created() {
    new PlansServices().getPlans().then(response=>{
      this.plans=response.data
    })
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
    },
    planSelected(price){
      this.addTemporaryPlan(price)
      this.$router.push("/sign-up-register")
    },
    addTemporaryPlan(plan){
      console.log("PLAN TEMPORALMENTE GUARDADO: ",plan)
      localStorage.setItem("selectedPlan",JSON.stringify(plan))
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