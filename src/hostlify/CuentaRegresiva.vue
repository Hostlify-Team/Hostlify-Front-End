<template>
  <pv-progress-bar :value="progress">

  </pv-progress-bar>
  <p>Time goal: {{horaMeta}}</p>
  <p>Time actual: {{horaActual}}</p>
  <p>Meta: {{total}}</p>
  <p>Progreso: {{progress}}</p>
</template>

<script>
export default {
  name: "CuentaRegresiva",
  data() {
    return {
      total:null,
      progress:null,
      horaMeta: null,
      horaActual: null,
      value1: 0
    }
  },
  interval: null,
  methods: {
    startProgress() {
      this.interval = setInterval(() => {
        this.horaActual=new Date()
        this.getCurrentDifferenceTime(new Date(),this.horaMeta)
      }, 1000);
    },
    getTimeLack(currentDate,goalDate){
      let difference= Math.abs(goalDate - currentDate);
      this.total = (difference/ 60000)
    },
    getCurrentDifferenceTime(currentDate,goalDate){
      let difference= Math.abs(goalDate - currentDate);
      this.progress = 100-Math.trunc(((difference/ 60000)/this.total) *100)
      if(this.progress<0){
        this.progress=100
      }
    }
  },
  mounted() {
    this.startProgress();
  },
  created() {
    this.horaMeta=new Date("10/15/2022")
    this.horaActual=new Date("10/14/2022");
    this.getTimeLack(this.horaActual,this.horaMeta)

  }
}
</script>

<style scoped>

</style>