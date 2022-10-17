<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button  class="p-button-success" style="margin-right: 1rem;" @click="showAddRoomDialog"> <i class="pi pi-plus"/>{{$t("new room")}} </pv-button>
          <pv-button label="Delete" class="p-button-danger" @click="showDeleteRoomsDialog"
                     :disabled="!selectedRooms || !selectedRooms.length"><i class="pi pi-trash"/>{{$t("delete")}} </pv-button>
        </template>
        <template #end>
          <pv-button label="Exportar" class="p-button-help" @click="exportToCSV($event)"><i class="pi pi-download"/>{{$t("export")}}</pv-button>
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
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} habitaciones"
          responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">{{$t('rooms')}}</h5>
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
            <pv-tag v-if="slotProps.data.status === true" severity="success">{{$t('available')}}</pv-tag>
            <pv-tag v-else severity="danger">{{$t('occupied')}}</pv-tag>
          </template>
        </pv-column>
        <pv-column field="progressTime" header="Tiempo" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <pv-progress-bar :value="slotProps.data.progressTime"></pv-progress-bar>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <i class="p-text-secondary" style="font-size: 1.5rem;margin-right: 1rem" v-badge="slotProps.data.quantityOfServices" v-if="slotProps.data.servicePending!==false">
              <pv-button  icon="pi pi-bell" class="p-button-rounded p-button-secondary" @click="showNotificationsRoomDialog(slotProps.data)">
              </pv-button>
            </i>
            <pv-button v-if="slotProps.data.emergency" icon="pi pi-exclamation-circle" class="p-button-rounded p-button-danger">
            </pv-button>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button  v-if="slotProps.data.guestId!==null" @click="showDeleteGuestDialog(slotProps.data)">{{$t('evict')}}</pv-button>
            <pv-button  v-if="slotProps.data.guestId===null" @click="showRegisterGuestDialog(slotProps.data)">{{$t('register')}}</pv-button>
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
            <pv-button :label="'Cancelar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" >{{$t("cancel")}}</pv-button>
            <pv-button :label="'Agregar'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="addRoom" >{{$t("add")}}</pv-button>
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
            <pv-button :label="'Cancelar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" >{{$t("cancel")}}</pv-button>
            <pv-button :label="'Agregar'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="editRoom" >{{$t("add")}}</pv-button>
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deleteRoomDialog" :style="{ width: '450px' }" header="Eliminar una habitacion" :modal="true">
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 1rem" />
            <span>Estas seguro que quieres eliminar la habitacion <br> <b>{{ room.roomName }}</b>?</span>
            <span v-if="room.guestId!==null"> <br>Tambien se eliminara al huesped <b>{{ room.guestName }}</b></span>
          </div>
          <template #footer >
            <pv-button icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" >{{$t("no")}}</pv-button>
            <pv-button icon="pi pi-check" class="p-button-text" @click="deleteRoom(room)" >{{$t("yes")}}</pv-button>
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="deleteRoomsDialog" :style="{ width: '450px' }" header="Eliminar las habitaciones" :modal="true">
            <span>Quieres eliminiar las habitaciones seleccionadas?</span>
          <template #footer>
            <pv-button  icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" >{{$t("no")}}</pv-button>
            <pv-button  icon="pi pi-check" class="p-button-text" @click="deleteRooms" >{{$t("yes")}}</pv-button>
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
            <pv-button  icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" >{{$t("no")}}</pv-button>
            <pv-button icon="pi pi-check" class="p-button-text" @click="deleteGuest(room)" >{{$t("yes")}}</pv-button>
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="notificationsRoomsDialog" :style="{ width: '500px' }" header="Actividad del cliente" :modal="true">
          <div style="display: flex; justify-content:center">
            <h1>Solicitudes</h1>
          </div>
          <div class="container">
            <div>
              <h3>Pendiente: </h3>
              <div style="display: flex;justify-content: space-between;align-items: center" v-for="service in guestServices">
                <div>
                  <p>Se solicito {{ service.dish }}</p>
                </div>
                <div style="display: flex; justify-content:center">
                  <pv-button class="button" style="border-radius: 0.4rem; color:white;font-weight:bold" @click="showGuestServiceInfo(service,guestServices.length)">Administrar</pv-button>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <pv-button :label="'Cerrar'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
          </template>
        </pv-dialog>

        <pv-dialog v-model:visible="serviceInformation" :style="{ width: '500px' }" header="Informacion del servicio" :modal="true">
          <div style="display: flex; justify-content:center">
            <h1>Resumen del servicio</h1>
          </div>
          <div >
            <div>
              <h3>Platillo: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 3rem 0 1.5rem">
                <div>
                  <p>{{guestServiceInfo.dish}}</p>
                </div>
                <div>
                  <p>Cant. {{guestServiceInfo.dishQuantity}}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Bebida: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 3rem 0 1.5rem">
                <div>
                  <p>{{guestServiceInfo.drink}}</p>
                </div>
                <div>
                  <p>Cant. {{guestServiceInfo.drinkQuantity}}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Crema: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 3rem 0 1.5rem">
                <div>
                  <p>{{guestServiceInfo.cream}}</p>
                </div>
                <div>
                  <p>Cant. {{guestServiceInfo.creamQuantity}}</p>
                </div>
              </div>
            </div>
            <div v-if="guestServiceInfo.instruction!==null">
              <h3>Intruccion: </h3>
              <div style="display: flex;justify-content: space-between;margin: 0 3rem 0 1.5rem">
                <div>
                  <p>{{guestServiceInfo.instruction}}</p>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <pv-button :label="'Atender'.toUpperCase()" class="p-button-text" @click="deleteService(guestServiceInfo.id,guestServiceInfo.length)" />
            <pv-button :label="'Volver'.toUpperCase()" class="p-button-text" @click="cancelShowGuestServiceInfo" >{{$t("return")}}</pv-button>
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
import {FoodServices} from "../services/food-services";
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
      serviceInformation:false,
      editRoomAuxiliaryId:null,
      guestServices:[],
      guestServiceInfo:{},
      guestServiceInfoQuantity:null,
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
      this.setVisibleNotifications()
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
      console.log(data.id,data.emergency,data.guestId,data.servicePending)
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
      this.room.servicePending = data.servicePending
      this.editRoomDialog = true
      this.setGuestInfo()
    },
    showDeleteRoomDialog(data) {
      this.room.roomName = data.roomName
      this.room.id = data.id
      this.room.guestId = data.guestId
      this.room.guestName = data.guestName
      this.room.servicePending = data.servicePending
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
      this.room.id = data.id
      this.room.servicePending = data.servicePending
      this.editRoomAuxiliaryId=data.id
    },
    setVisibleNotifications(){
      for(let i=0;i<(this.rooms.length);i++){
       this.getServicesForRoom(this.rooms[i].id)
      }
    },
    showNotificationsRoomDialog(data){
      this.notificationsRoomsDialog=true
      this.room=data
      this.getServicesForRoom(data.id)
    },
    showGuestServiceInfo(data,len){
      this.guestServiceInfoQuantity=len
      this.serviceInformation=true
      this.guestServiceInfo=data
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
      this.room.servicePending = false
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
        let temporaryIndex=this.findIndexById(response.data.id)
        this.rooms[temporaryIndex] = this.room
        this.room = {}
        this.editRoomDialog = false
        console.log(this.rooms[temporaryIndex].progressTime)
        new UserServices().getUser(this.rooms[temporaryIndex].guestId).then(response=>{
          this.rooms[temporaryIndex].guestName=response.data.name

        })
      })
    },
    deleteRoom(roomData) {
      if(roomData.guestId!==null){
        this.deleteGuest(roomData)
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
    deleteGuest(roomData) {
      this.evictGuestDialog=false
      new UserServices().deleteUser(roomData.guestId).then(response=>{
          console.log("Guest deleted",response.data)
        if(this.room.servicePending===true){
          this.deleteServiceByRoomId(roomData.id)
        }
        let id=this.findIndexById(this.room.id)
        this.rooms[id].guestId=null
        this.rooms[id].status=true
        this.rooms[id].initialDate=null
        this.rooms[id].endDate=null
        this.rooms[id].price=null
        this.rooms[id].emergency=false
        this.rooms[id].progressTime=null
        this.rooms[id].totalTime=null
        this.rooms[id].guestStayComplete=null
        this.rooms[id].servicePending=false
        new RoomServices().updateRoom(this.room.id,this.rooms[id]).then(response=>{
          this.setGuestInfo()
          this.rooms[id].progressTime=0
          this.rooms[id].totalTime=null
          this.rooms[id].guestStayComplete=null
          console.log("Guest evicted successfully",response.data)
          this.editRoomAuxiliaryId=null
          this.$toast.add({severity:'success', summary: 'Huesped desalojado', detail:'Se desalojo el huesped correctamente', life: 3000});
        }).catch(Result=>{
          console.log("Handled Error",Result.data)
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
    cancelShowGuestServiceInfo(data){
      this.serviceInformation=false
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
    deleteService(id){
      new FoodServices().deleteFoodServiceById(id).then(response=>{
        console.log(response.data)
        this.guestServices = this.guestServices.filter(
            (t) => t.id !== id);
      })
      if(this.guestServiceInfoQuantity===1){
        let temporalRoom=this.room
        temporalRoom.servicePending=false
        new RoomServices().updateRoom(this.room.id,temporalRoom).then(response=>{
          console.log("Rooms.service",response.data.service)
          this.notificationsRoomsDialog=false
        })
      }
      this.serviceInformation=false
      this.guestServiceInfo={}
    },
    deleteServiceByRoomId(id){
      console.log(id,typeof(id))
      new FoodServices().getFoodServiceByRoomId(id).then(response=>{
        for (let i=0;i<response.data.length;i++){
          console.log(response.data[i].id)
          new FoodServices().deleteFoodServiceById(response.data[i].id)
        }
        console.log("Service deleted successfully")
      })
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
    getServicesForRoom(id){
      if(this.notificationsRoomsDialog===false){
        this.guestServices=[]
        new FoodServices().getFoodServiceByRoomId(id).then(response=>{
          for(let i=0;i<(response.data.length);i++){
            this.guestServices.push(response.data[i])
          }
          let index=this.findIndexById(id)
          this.rooms[index].quantityOfServices=response.data.length

        })

      }
    },
    startProgress() {
      this.interval = setInterval(() => {
        for(let i=0;i<this.rooms.length;i++){
          if(this.rooms[i].guestStayComplete===false){
            this.increaseProgress(i)
            if(this.rooms[i].progressTime===100 && this.rooms[i].guestStayComplete===false){
              console.log("En progreso",this.rooms[i].guestId)
              this.room=[]
              this.rooms[i].guestStayComplete=true
              this.room=this.rooms[i]
              this.editRoom()
            }
          }
        }
      }, 60000);
    },
    watchServices(){
      this.interval = setInterval(() => {
        for(let i=0;i<this.rooms.length;i++){
          if(this.rooms[i].guestStayComplete===false){
            new RoomServices().getRoomForGuest(this.rooms[i].guestId).then(response=>{
              if(response.data[0].emergency===true){
                this.rooms[i].emergency=true
              }if(response.data[0].emergency===false){
                this.rooms[i].emergency=false
              }
              if(response.data[0].servicePending!==false){
                this.rooms[i].servicePending=response.data[0].servicePending
                this.setVisibleNotifications()
              }else {
                this.rooms[i].servicePending=false
              }
            })
          }
        }
      }, 5000);
    },
    increaseProgress(i){
      let format=this.rooms[i].endDate.split("/")
      let goalDate=(format[1]+"/"+format[0]+"/"+format[2])
      this.rooms[i].progressTime=this.getProgressTimeForGuest(goalDate,this.rooms[i].totalTime)
    },
  },
  mounted() {
    this.startProgress()
    this.watchServices()
    this.emitter.on("register-form", response => {
      this.registerGuestDialog = response;
    });
    this.emitter.on("new-guest", response => {
      let auxiliaryRoomId= parseInt(sessionStorage.getItem("temporaryRoomId"))
      console.log("Json",auxiliaryRoomId)
      let id=this.findIndexById(auxiliaryRoomId)
      console.log("Index",id)
      console.log(this.rooms[id].guestId,this.rooms)
      console.log("Response",response.id)
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
  //!Todo: Para la proxima revision arreglar el registro de usuario inclompleto y observador de notificaciones
};
</script>

<style scoped>
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>
