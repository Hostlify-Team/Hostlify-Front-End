<template>
  <div class="SOS">
    <div class="title" style="margin: 4rem 4rem 0 4rem">
      <h1 style="margin-top: 0">Ayuda</h1>
    </div>
    <div class="SOS_alert">
      <pv-button>
        SOS
      </pv-button>

    </div>
    <div class="SOS_button">
      <pv-button label="Volver" @click="goBack"> </pv-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SOS",
  components: {},

  methods:{
    goBack(){
      this.$router.push("/services")
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

.SOS {
  width: 95vw;
  height: 83vh;
  font-family: 'Roboto', sans-serif;

}
.SOS_alert{
  display: flex;
  justify-content: center;
}
.SOS_alert button{
  border-radius: 50rem;
  background-color: #d6a049;
  display: flex;
  justify-content: center;
  width: 30.5vw;
  height: 65vh;
}
.SOS_alert button {
  font-weight: bold;
  font-family: Arial;
  font-size: 10vw;
  color: white;
}
.SOS_button{
  display: flex;
  justify-content: end;
}
.SOS_button button {
  border-radius: 3rem;
  border-style: none;
  background-color: #D6A049;
  color: white;

}
</style>