<template>
  <div style="height: 98vh ;margin: 0;display:flex; justify-content: center; align-items: center;">
    <pv-card style=" border-radius: 1rem;justify-content: center;width: 70vw;">
      <template #content>
        <div>
          <div class="steps" >
            <h4 style="margin: 0 0 0 2rem">Paso 1 de 3</h4>
          </div>
          <div class="phrase" style="margin-bottom: 1rem; display: flex; justify-content: center; text-align: center">
            <h1>Elige tu plan en Hostlify</h1>
          </div>
          <div class="switch" >
            <pv-select-button v-model="value1" :options="options" aria-labelledby="single" @click="changePlan"/>
          </div>
          <div class="plans">
            <div v-show="defaultPlan" class="default">
              <div class="cards">
                <div v-for="plan in plans">
                  <pv-card class="card">
                    <template #header>
                      <div class="solidColor" v-if="plan.name==='Standard'" style="background-color: #FFC286"></div>
                      <div class="solidColor" v-if="plan.name==='Pro'" style="background-color: #EA9D51"></div>
                      <div class="solidColor" v-if="plan.name==='Premium'" style="background-color: #F1C94E"></div>
                    </template>
                    <template #content>
                      <div class="content">
                        <h2>{{plan.name}}</h2>
                        <div class="visible">
                          <template v-if="plan.rooms!==null" >
                            <div class="usher">
                              <p style="margin-top: 6px">Este plan te permite tener </p>
                              <p class="until">hasta</p>
                            </div>
                            <p style="margin-top: 6px">{{plan.rooms}} habitaciones</p>
                          </template>
                          <template v-else >
                            <div class="usherVisible">
                              <p style="margin-top: 15px">Este plan te permite tener </p>
                            </div>
                            <p style="margin-top: 14px">infinitas habitaciones</p>
                          </template>
                        </div>
                        <div class="price">
                          <p style="font-weight: bold; margin-top: 8px">{{ plan.price }} S/</p>
                          <div style="display: table;">
                            <p style="margin: 0;padding: 0 0 0.45rem 0.1rem ;align-items: end ;display: table-cell;vertical-align: bottom; color: darkgrey" >mo*</p>
                          </div>
                        </div>
                        <pv-button class="planButton" v-if="plan.name==='Standard'" style="background-color: #FFC286; color:white" @click="planSelected('Standard')">Elegir</pv-button>
                        <pv-button class="planButton" v-if="plan.name==='Pro'" style="background-color: #EA9D51; color:white" @click="planSelected('Pro')">Elegir</pv-button>
                        <pv-button class="planButton" v-if="plan.name==='Premium'" style="background-color: #F1C94E; color:white" @click="planSelected('Premium')">Elegir</pv-button>
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
                        <pv-button style="margin-top: .5em; background-color: #D6A049; color:white" @click="customPlanSelected('Custom',customPlanPrice*6.50)">Elegir</pv-button>
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
      plans:[]
    }
  },
  created() {
    var planStandar={} ;
    var planPro={} ;
    var planPremium={} ;

    planStandar.id=1
    planStandar.name="Standard"
    planStandar.rooms=30
    planStandar.price=180

    planPro.id=2
    planPro.name="Pro"
    planPro.rooms=50
    planPro.price=260

    planPremium.id=3
    planPremium.name="Premium"
    planPremium.rooms=null
    planPremium.price=400

    this.plans.push(planStandar)
    this.plans.push(planPro)
    this.plans.push(planPremium)

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
    planSelected(plan){
      this.addTemporaryPlan(plan)
      this.$router.push("/sign-up-register")
    },
    customPlanSelected(plan,price){
      this.customPlanPrice=price
      this.addTemporaryPlan(plan)
      this.$router.push("/sign-up-register")
    },
    addTemporaryPlan(plan){
      localStorage.setItem("selectedPlan",JSON.stringify(plan))
      if(plan==="Custom"){
        localStorage.setItem("mountPlan",JSON.stringify(this.customPlanPrice))
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
  width: 18em;
}
p {
  line-height: 1.5;
  margin-bottom: 0.5rem
}
.content h2{
  margin-bottom: 0.5rem;
}
.price{
  display: flex;
}
.cards{
  margin-bottom: 3rem;
  display: flex;
  justify-content: space-evenly;
}
.planButton{
  margin-top: .5em;
}
.until{
  margin-top: 6px;
  margin-left: 4px;
}
.usher{
  display: flex;
}
.switch{
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;
}
@media (max-width:1280px){
  .cards{
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
  }
  .card{
    border-radius: 1rem;
    background-color: white;
    color: black;
    margin-top: 0;
    width: 14em;
    height: 18em;
  }
  .content h2{
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .content p{
    margin-top: 0;
  }
  .until{
    visibility: hidden;
    height: 0;
    width: 0;
    margin: 0;
  }
  .planButton{
    margin-top: 0;
  }
}
@media (max-width:1054px){
  .cards{
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-evenly;
  }
  .card{
    border-radius: 1rem;
    background-color: white;
    color: black;
    margin-top: 0;
    width: 10em;
    height: 14em;
  }
  .content h2{
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .content p{
    margin-top: 0;
  }
  .until{
    visibility: hidden;
    height: 0;
    width: 0;
    margin: 0;
  }
  .planButton{
    margin-top: 0;
  }
  .visible{
    visibility: hidden;
    height: 0;
    width: 0;
    margin: 0;
  }
}
@media (max-width:700px){
  .default{
    display: flex;
    justify-content: center;
  }
  .cards{
    margin-bottom: 3rem;
    display: block;
    justify-content: center;
  }
  .card{
    border-radius: 1rem;
    background-color: white;
    color: black;
    margin-bottom: 1.5rem;
    width: 10em;
    height: 14em;
  }
  .content h2{
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
  .content p{
    margin-top: 0;
  }
  .planButton{
    margin-top: 0;
  }
}
@media (max-width:559px){
  .default{
    display: flex;
    justify-content: center;
  }
  .cards{
    margin-bottom: 3rem;
    display: block;
    justify-content: center;
  }
  .switch{
    margin-left: 15vw;
  }
}
</style>