<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button label="Nueva habitacion" icon="pi pi-plus" class="p-button-success mr-2" @click="showAddRoomDialog"/>
          <pv-button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="showDeleteRoomsDialog"
                     :disabled="!selectedRooms || !selectedRooms.length"/>
        </template>
        <template #end>
          <pv-button label="Exportar" icon="pi pi-download" class="p-button-help" @click="exportToCSV($event)"/>
        </template>
      </pv-toolbar>
      <pv-data-table
          ref="dt"
          :value="rooms"
          v-model:selection="selectedRooms"
          datakey="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
          responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Habitaciones</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search"/>
              <pv-input-text v-model="filters['global'].value" placeholder="Search..."/>
            </span>
          </div>
        </template>

        <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
        <pv-column field="roomName" header="Habitacion" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="guestId" header="Huesped" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <p v-if="slotProps.data.guestId!==null">{{slotProps.data.guestName}}</p>
          </template>
        </pv-column>
        <pv-column field="initialDate" header="Fecha de ingreso" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="price" header="Precio" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <p v-if="slotProps.data.price!==null">S/. {{slotProps.data.price}}</p>
          </template>
        </pv-column>
        <pv-column field="status" header="Status" :sortable="true" style="min-width: 12rem">
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.status === true" severity="success">Disponible</pv-tag>
            <pv-tag v-else severity="danger">Ocupada</pv-tag>
          </template>
        </pv-column>
        <pv-column field="progressTime" header="Tiempo" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <pv-progress-bar :value="slotProps.data.progressTime"></pv-progress-bar>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <i class="p-text-secondary" style="font-size: 1.5rem" v-badge="2" v-if="slotProps.data.guestId!==null">
              <pv-button  icon="pi pi-bell" class="p-button-rounded p-button-secondary" @click="showNotificationsRoomDialog(slotProps.data)">
              </pv-button>
            </i>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button label="Desalojar" v-if="slotProps.data.guestId!==null" @click="showDeleteGuestDialog(slotProps.data)"/>
            <pv-button label="Registrar" v-if="slotProps.data.guestId===null" @click="showRegisterGuestDialog(slotProps.data)"/>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="showEditRoomDialog(slotProps.data)"/>
            <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded" @click="showDeleteRoomDialog(slotProps.data)"/>
          </template>
        </pv-column>

        <pv-dialog v-model:visible="addRoomDialog" :style="{ width: '450px'}" header="Agregue una habitacion" :modal="true" class="p-fluid">
          <div style="margin: 2rem">
            <span class="p-float-label">
              <pv-input-text type="text" id="room" v-model.trim="room.roomName" required="true" autofocus :class="{'p-invalid': submitted && !room.name }"/>
              <label for="room">Nro de habitacion</label>
              <small class="p-error" v-if="submitted && !room.name">Se requiere un numero de habitacion</small>
            </span>
          </div>
          <div style="margin: 2rem">
            <span class="p-float-label">
              <pv-text-area type="text" id="description" v-model.trim="room.description" required="true" autofocus :class="{'p-invalid': submitted && !room.description }"/>
              <label for="description">Decripcion</label>
              <small class="p-error" v-if="submitted && !room.description">Se requiere una descripcion de habitacion</small>
            </span>
          </div>
          <template #footer>
            <pv-button :label="'Cancelar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Agregar'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="addRoom" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="editRoomDialog" :style="{ width: '450px'}" header="Editar una habitacion" :modal="true" class="p-fluid">
          <div class="edit-content">
            <span>Estas editando la habitacion <b>{{ room.roomName }}</b></span>
          </div>
          <div style="margin: 2rem">
            <span class="p-float-label">
              <pv-input-text type="text" id="room" v-model.trim="room.roomName" required="true" autofocus :class="{'p-invalid': submitted && !room.name }"/>
              <label for="room">Nro de habitacion</label>
              <small class="p-error" v-if="submitted && !room.name">Se requiere un numero de habitacion</small>
            </span>
          </div>
          <div style="margin: 2rem">
            <span class="p-float-label">
              <pv-text-area type="text" id="description" v-model.trim="room.description" required="true" autofocus :class="{'p-invalid': submitted && !room.description }"/>
              <label for="description">Decripcion</label>
              <small class="p-error" v-if="submitted && !room.description">Se requiere una descripcion de habitacion</small>
            </span>
          </div>
          <template #footer>
            <pv-button :label="'Cancelar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Agregar'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="editRoom" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deleteRoomDialog" :style="{ width: '450px' }" header="Eliminar una habitacion" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
            <span>Estas seguro que quieres eliminar la habitacion <br> <b>{{ room.roomName }}</b>?</span>
            <span v-if="room.guestId!==null"> <br>Tambien se eliminara al huesped <b>{{ room.guestName }}</b></span>
          </div>
          <template #footer >
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Si'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteRoom(room.guestId)" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deleteRoomsDialog" :style="{ width: '450px' }" header="Eliminar las habitaciones" :modal="true">
            <span>Quieres eliminiar las habitaciones seleccionadas?</span>
          <template #footer>
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteRooms" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="registerGuestDialog" :style="{ width: '60vw'}" header="Registrar un huesped" :modal="true" class="p-fluid">
          <Register_Huesped></Register_Huesped>
        </pv-dialog>

        <pv-dialog v-model:visible="evictGuestDialog" :style="{ width: '450px' }" header="Desalojar huesped" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
            <span>Desea eliminar al huesped <b>{{ room.guestName }}</b>?</span>
          </div>
          <template #footer>
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteGuest(room.guestId)" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="notificationsRoomsDialog" :style="{ width: '700px' }" header="Actividad del cliente" :modal="true">
          <div style="display: flex; justify-content:center">
            <h1>Solicitudes pendientes</h1>
          </div>
          <div class="container">
            <div>
              <h3>Pendiente: </h3>
              <div style="display: flex;justify-content: space-between;align-items: center">
                <div>
                  <p>Descripcion</p>
                </div>
                <div style="display: flex; justify-content:center">
                  <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold" @click="sendOrder">Solucionar</pv-button>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <pv-button :label="'Cerrar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
          </template>
        </pv-dialog>




      </pv-data-table>
    </div>
  </div>
</template>

<script>
import {RoomServices} from "../services/room-services";
import {UserServices} from "../services/user-services";
import {HistoryServices} from "../services/history-services";
import { FilterMatchMode } from "primevue/api";
import Register_Huesped from "./Register_Huesped.vue";

export default {
  components:{
    Register_Huesped
  },
  data() {
    return {
      rooms:[],
      addRoomDialog:false,
      editRoomDialog:false,
      deleteRoomDialog:false,
      deleteRoomsDialog:false,
      notificationsRoomsDialog:false,
      evictGuestDialog:false,
      registerGuestDialog:false,
      editRoomAuxiliaryId:null,
      room:{},
      selectedRooms:null,
      statusesRoom: [
        { value: "Disponible" },
        { value: "Ocupada" },
      ],
      filters: {},
      submitted: false
    };
  },
  created() {
    new RoomServices().getRoomsForManager(sessionStorage.getItem("id")).then(response=>{
      this.rooms=response.data
      this.setGuestInfo()
      console.log("Rooms",this.rooms)
    })
    this.initFilters();
  },
  methods: {
    showAddRoomDialog() {
      this.room = {}
      this.room.description=""
      this.addRoomDialog = true
    },
    showEditRoomDialog(data) {
      console.log(data.id,data.emergency)
      this.room.id = data.id
      this.room.roomName = data.roomName
      this.room.managerId = data.managerId
      this.room.guestId = data.guestId
      this.room.status = data.status
      this.room.progressTime = data.progressTime
      this.room.guestStayComplete = data.guestStayComplete
      this.room.initialDate = data.initialDate
      this.room.endDate = data.endDate
      this.room.price = data.price
      this.room.image = data.image
      this.room.description = data.description
      this.room.emergency = data.emergency
      this.editRoomDialog = true
    },
    showDeleteRoomDialog(data) {
      this.room.roomName = data.roomName
      this.room.id = data.id
      this.room.guestId = data.guestId
      this.room.guestName = data.guestName
      this.deleteRoomDialog = true
    },
    showDeleteRoomsDialog() {
      this.deleteRoomsDialog = true
    },
    showRegisterGuestDialog(data) {
      this.registerGuestDialog = true
      this.editRoomAuxiliaryId=data.id
      sessionStorage.setItem("temporaryRoomId",data.id)
      console.log("Room id: ",data.id,data.roomName)
    },
    showDeleteGuestDialog(data){
      this.evictGuestDialog=true
      this.room.guestId = data.guestId
      this.room.guestName = data.guestName
      this.editRoomAuxiliaryId=data.id
    },
    showNotificationsRoomDialog(data){
      this.notificationsRoomsDialog=true
    },
    addRoom() {
      this.room.managerId = parseInt(sessionStorage.getItem("id"))//Todo: Guardar en int Y actualizar el progress cuando se elimine
      this.room.guestId = null
      this.room.status = true
      this.room.progressTime = 0
      this.room.guestStayComplete = null
      this.room.initialDate = null
      this.room.endDate = null
      this.room.price = null
      this.room.emergency = false
      this.room.image = "https://www.europahotelbelfast.com/wp-content/uploads/2021/12/Shannon-Suite-5.jpg"
      new RoomServices().postRoom(this.room).then(response => {
        this.rooms.push(response.data)
        console.log("Room added successfully", response.data)
        this.room = {}
        this.addRoomDialog = false
      })
    },
    editRoom() {
      new RoomServices().updateRoom(this.room.id, this.room).then(response => {
        console.log("function: EditRoom",response.data)
        this.rooms[this.findIndexById(response.data.id)] = this.room
        this.room = {}
        this.editRoomDialog = false
      })
    },
    deleteRoom(guestId) {
      if(guestId!==null){
        new UserServices().deleteUser(guestId).then(responseUser=>{
          console.log("User deleted",responseUser.data)
        })
      }
      new RoomServices().deleteRoom(this.room.id).then(response => {
        this.rooms = this.rooms.filter(
            (t) => t.id !== this.room.id
        );

        this.room = {}
        console.log("room deleted successfully",response.data)
        this.deleteRoomDialog = false
      })
    },
    setGuestInfo(){
      for(let i=0;i<this.rooms.length;i++){
        if(this.rooms[i].guestId!==null){
          new UserServices().getUser(this.rooms[i].guestId).then(response=>{
            this.rooms[i].guestName=response.data.name
            let formatGoal=this.rooms[i].endDate.split("/")
            let goalDate=(formatGoal[1]+"/"+formatGoal[0]+"/"+formatGoal[2])
            let currentTime=new Date()
            let actualDay= currentTime.getDate()
            let actualMonth= currentTime.getMonth()
            let currentTimeFormat=(actualMonth+1)+"/"+actualDay+"/"+currentTime.getFullYear()
            this.rooms[i].totalTime=this.setTotalTimeForGuest(currentTimeFormat,goalDate)
            this.rooms[i].progressTime=this.getProgressTimeForGuest(goalDate,this.rooms[i].totalTime)
          })
        }else {
          this.rooms[i].guestName=null
        }
      }
    },
    deleteGuest(guestId) {
      this.evictGuestDialog=false
      new UserServices().deleteUser(guestId).then(response=>{
          console.log("Guest deleted",response.data)
        let id=this.findIndexById(this.editRoomAuxiliaryId)
        this.rooms[id].guestId=null
        this.rooms[id].status=true
        this.rooms[id].initialDate=null
        this.rooms[id].endDate=null
        this.rooms[id].price=null
        this.rooms[id].emergency=false
        this.rooms[id].progressTime=null
        this.rooms[id].totalTime=null
        this.rooms[id].guestStayComplete=null
        new RoomServices().updateRoom(this.editRoomAuxiliaryId,this.rooms[id]).then(response=>{
          this.setGuestInfo()
          this.rooms[id].progressTime=0
          this.rooms[id].totalTime=null
          console.log("ELIMINE",this.rooms[id].totalTime)
          console.log("prgores",this.rooms[id].progressTime)
          this.rooms[id].guestStayComplete=null
          console.log("Guest evicted successfully",response.data)
          this.editRoomAuxiliaryId=null
          this.$toast.add({severity:'success', summary: 'Huesped desalojado', detail:'Se desalojo el huesped correctamente', life: 3000});
        })

      })
    },
    deleteRooms() {
      this.selectedRooms.forEach((room) => {
        new RoomServices().deleteRoom(room.id).then((response) => {
          this.rooms = this.rooms.filter(
              (t) => t.id !== room.id
          );
          console.log(response);
        });
      });
      this.deleteRoomsDialog = false;
    },
    hideAnyDialog() {
      this.addRoomDialog = false
      this.editRoomDialog = false
      this.deleteRoomDialog = false
      this.deleteRoomsDialog = false
      this.evictGuestDialog=false
      this.notificationsRoomsDialog=false
      this.room = {}
    },
    findIndexById(id) {
      return this.rooms.findIndex((room) => room.id === id);
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    initFilters() {
      this.filters = {
        global: {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    },
    SetProgressTimeBar(firstDayDate,lastDayDate){
      //!TODO: HACERLO CON HORAS, para eso necesitamos hacer las operaciones con los objetos sin parametros
      let actualDayDate= new Date();
      let day1 = new Date(firstDayDate);
      let day2 = new Date(lastDayDate);
      let day3 = new Date((actualDayDate.getMonth()+1)+"/"+actualDayDate.getDate()+"/"+actualDayDate.getFullYear())
      console.log((actualDayDate.getMonth()+1)+"/"+actualDayDate.getDate()+"/"+actualDayDate.getFullYear())

      let totalDifference= Math.abs(day2-day1);
      let totalDays = totalDifference/(1000 * 3600 * 24)

      let currentDifference= Math.abs(day2-day3);
      let currentDays = currentDifference/(1000 * 3600 * 24)
      if(totalDays===0){
        console.log("progreso:",100)
        return 100
      }else{
        let progressValue=Math.round(((totalDays-currentDays)/totalDays)*100)
        return progressValue
      }
    },
    setTotalTimeForGuest(currentDate,goalDate){
      let _goalDate=new Date(goalDate)
      let _currentDate=new Date(currentDate)
      let difference= Math.abs(_goalDate - _currentDate);
      let total = (difference/ 60000)
      return total
    },
    getProgressTimeForGuest(goalDate,total){
      let _goalDate=new Date(goalDate)
      let _currentDate=new Date()
      let difference= Math.abs((_goalDate) - (_currentDate));
      let progress = 100-Math.trunc(((difference/ 60000)/total) *100)
      if(progress<0){
        return 100
      }else {
        return progress
      }
    },
    startProgress() {
      this.interval = setInterval(() => {
        for(let i=0;i<this.rooms.length;i++){
          if(this.rooms[i].guestStayComplete===false){
            this.increaseProgress(i)
            if(this.rooms[i].progressTime===100 && this.rooms[i].guestStayComplete===false){
              this.room=[]
              this.rooms[i].guestStayComplete=true
              this.room=this.rooms[i]
              this.editRoom()
            }
          }
        }
      }, 60000);
    },
    increaseProgress(i){
      //
      let format=this.rooms[i].endDate.split("/")
      let goalDate=(format[1]+"/"+format[0]+"/"+format[2])
      this.rooms[i].progressTime=this.getProgressTimeForGuest(goalDate,this.rooms[i].totalTime)
    },

  },

  mounted() {
    this.startProgress()
    this.emitter.on("register-form", response => {
      this.registerGuestDialog = response;
    });
    this.emitter.on("new-guest", response => {
      this.editRoomAuxiliaryId= parseInt(sessionStorage.getItem("temporaryRoomId"))
      let id=this.findIndexById(this.editRoomAuxiliaryId)
      console.log(id,this.rooms[id].guestId,response.id)
      this.rooms[id].guestId=response.id
      this.rooms[id].status=false
      this.rooms[id].initialDate=response.initialDate
      this.rooms[id].endDate=response.endDate
      this.rooms[id].price=response.price
      this.rooms[id].emergency=false
      this.rooms[id].guestStayComplete=false
      this.rooms[id].totalTime=this.setTotalTimeForGuest(response.firstDayDate,response.lastDayDate)
      this.rooms[id].progressTime=this.getProgressTimeForGuest(response.lastDayDate,this.rooms[id].totalTime)

      new UserServices().getUser(this.rooms[id].guestId).then(response=>{
        let roomStorable=this.rooms[id]
        roomStorable.guestName= response.data.name
        roomStorable.guestEmail= response.data.email
        new HistoryServices().postRoomHistory(roomStorable).then(response=>{
          console.log("Room added to history",response.data)
        })
      })
      new RoomServices().updateRoom(this.editRoomAuxiliaryId,this.rooms[id]).then(response=>{
          this.setGuestInfo()
          console.log("Guest added successfully",response.data)
          this.editRoomAuxiliaryId=null
        this.$toast.add({severity:'success', summary: 'Usuario Registrado', detail:'Se registro el usuario correctamente', life: 3000});
        })
      console.log(this.rooms)
    });
  }
};
</script>

<style scoped>
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
