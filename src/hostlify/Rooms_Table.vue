<template>
  <div class="background">
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
            <p v-if="slotProps.data.guestId!==0">{{slotProps.data.guestName}}</p>
          </template>
        </pv-column>
        <pv-column field="initialDate" header="Fecha de ingreso" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="price" header="Precio" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <p v-if="slotProps.data.price!==0">S/. {{slotProps.data.price}}</p>
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
            <pv-button v-if="slotProps.data.status===false" @click="showDeleteGuestDialog(slotProps.data)">{{$t('evict')}}</pv-button>
            <pv-button  v-if="slotProps.data.status" @click="showRegisterGuestDialog(slotProps.data)">{{$t('register')}}</pv-button>
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
              <label for="description">Descripcion</label>
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
            <span v-if="room.guestId!==0"> <br>Tambien se eliminara al huesped <b>{{ room.guestName }}</b></span>
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
            <div class="containerRegister">
                <div class="registerContainer">
                    <h1>Registrar Huesped</h1>
                    <div class="inputsContainer" v-show="visibleFormDialog">
                        <p >Datos del Huesped</p>
                        <pv-input-text class="inputRegister" type="text" placeholder="Nombre y apellido*" v-model="name"/>
                        <pv-input-text class="inputRegister" type="text" placeholder="Correo Electronico*" v-model="email"/>
                        <pv-input-text class="inputRegister" type="text" placeholder="Contraseña*" v-model="password"/>
                        <div style="display: flex ;justify-content: end">
                            <pv-button class="buttonRegister" style="align-items: end" @click="showDateDialog">Siguiente</pv-button>
                        </div>
                    </div>
                    <div class="inputsContainer" v-show="visibleDateDialog">
                        <div style="display: flex;justify-content: space-evenly">
                            <h3>Precio por dia: </h3>
                            <pv-input-text id="price" v-model="price" type="number" style="width: 3rem"></pv-input-text>
                            <h3> Soles</h3>
                        </div>
                        <pv-calendar v-model="endDate" :inline="true" :showWeek="true" />
                        <div style="display: flex ;justify-content: end">
                            <pv-button class="buttonRegister"  @click="ResumeDialogData">Siguiente</pv-button>
                        </div>
                    </div>
                    <div class="inputsContainer" v-show="visibleResumeDateGuest">
                        <h1>Credenciales del usuario</h1>
                        <h3 style="margin: 0">Correo: {{email}}</h3>
                        <h3 style="margin: 0">Contraseña: {{password}}</h3>
                        <h1>Resumen de registro</h1>
                        <h4 style="margin: 0">Fecha de ingreso: {{resumeInitialDate}}</h4>
                        <h4 style="margin: 0">Fecha de salida: {{resumeEndDate}}</h4>
                        <h4 style="margin: 0">Dias totales: {{resumeHotelDays}}</h4>
                        <h4 style="margin: 0">Precio total: {{resumePrice}}</h4>
                        <div style="display: flex;justify-content: space-around;">
                            <pv-button class="buttonRegister"  @click="Cancel">Cancelar</pv-button>
                            <pv-button class="buttonRegister"  @click="register">Registrar</pv-button>
                        </div>
                    </div>
                </div>
            </div>
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
import {FoodServices} from "../services/food-services";
import { FilterMatchMode } from "primevue/api";
import Register_Huesped from "./Register_Huesped.vue";

export default {
  components:{
    Register_Huesped
  },
  data() {
    return {
        token: sessionStorage.getItem("jwt"),
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
      submitted: false,
        ///////////////
        name:"",
        email:"",
        password:"",
        endDate:null,
        price:84,
        visibleResumeDateGuest:false,
        visibleFormDialog:true,
        visibleDateDialog:false,
        resumeInitialDate:null,
        resumeEndDate:null,
        resumePrice:null,
        resumeHotelDays:null

    };
  },
  created() {
    new RoomServices().getRoomsForManager(this.token,sessionStorage.getItem("id")).then(response=>{
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
      console.log(data.id,data.roomName,data.guestId,data.managerId)
        this.room.id = data.id
        this.room.roomName = data.roomName
        this.room.managerId = data.managerId
        this.room.guestId = data.guestId
        this.room.guestName=data.guestName
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
    },
    showDeleteGuestDialog(data){
      this.evictGuestDialog=true
      this.room.guestId = data.guestId
      this.room.guestName = data.guestName
      this.room.id = data.id
      this.room.servicePending = data.servicePending
        console.log("Lo hago nulo 343: "+data.id)
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
      this.getServicesForRoom( data.id)
    },
    showGuestServiceInfo(data,len){
      this.guestServiceInfoQuantity=len
      this.serviceInformation=true
      this.guestServiceInfo=data
    },
    addRoom() {
      this.room.managerId = parseInt(sessionStorage.getItem("id"))//Todo: Guardar en int Y actualizar el progress cuando se elimine
      this.room.guestId = 0
      this.room.status = true
      this.room.progressTime = 0
      this.room.guestStayComplete = null
      this.room.initialDate = null
      this.room.endDate = null
      this.room.price = 0
      this.room.emergency = false
      this.room.servicePending = false
      this.room.image = ""
      new RoomServices().postRoom(this.token,this.room).then(response => {
          this.room.id=response.data
          this.rooms.push(this.room)
          this.room = {}
          this.addRoomDialog = false
          console.log("Room added successfully :)", this.rooms)
      })

    },
    editRoom() {
        let temporaryIndex=this.findIndexById(this.room.id)
        if(this.room.guestId===null){this.room.guestId=0;this.room.price=0}
        new RoomServices().updateRoom(this.token, this.room.id, this.room).then(response => {
        this.rooms[temporaryIndex] = this.room
        this.room = {}
        this.editRoomDialog = false
          console.log(response.status)
      })
        if(this.rooms[temporaryIndex].guestId!==0){
            new UserServices().getUser(this.token,this.rooms[temporaryIndex].guestId).then(response=>{
                this.rooms[temporaryIndex].guestName=response.data.name
            })
        }

    },
    deleteRoom(roomData) {
      if(roomData.guestId!==null){
        this.deleteGuest(roomData)
      }
      new RoomServices().deleteRoom(this.token,this.room.id).then(response => {
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
        if(this.rooms[i].guestId!==0){
          new UserServices().getUser(this.token,this.rooms[i].guestId).then(response=>{
            this.rooms[i].guestName=response.data.name
            let formatGoal=this.rooms[i].endDate.split("/")
            let goalDate=(formatGoal[1]+"/"+formatGoal[0]+"/"+formatGoal[2])
            let currentTime=new Date()
            let actualDay= currentTime.getDate()
            let actualMonth= currentTime.getMonth()
            let currentTimeFormat=(actualMonth+1)+"/"+actualDay+"/"+currentTime.getFullYear()
            this.rooms[i].guestStayComplete=false
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
        new RoomServices().evictGuest(this.token,this.room.id).then(response=>{
            if(this.room.servicePending===true){
                this.deleteServiceByRoomId(roomData.id)
            }
            let id=this.findIndexById(this.room.id)
            this.rooms[id].guestId=0
            this.rooms[id].status=true
            this.rooms[id].initialDate=null
            this.rooms[id].endDate=null
            this.rooms[id].price=0
            this.rooms[id].emergency=false
            this.rooms[id].progressTime=null
            this.rooms[id].totalTime=null
            this.rooms[id].guestStayComplete=null
            this.rooms[id].servicePending=false
            this.setGuestInfo()
            this.rooms[id].progressTime=0
            this.rooms[id].totalTime=null
            this.rooms[id].guestStayComplete=null
            console.log("Lo hago nulo 460")
            this.editRoomAuxiliaryId=null
            console.log("Guest evicted successfully")
            this.$toast.add({severity:'success', summary: 'Huesped desalojado', detail:'Se desalojo el huesped correctamente', life: 3000});

        })
    },
    deleteRooms() {
      this.selectedRooms.forEach((room) => {
        new RoomServices().deleteRoom(this.token,room.id).then((response) => {
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
      new FoodServices().deleteFoodServiceById(this.token,id).then(response=>{
        console.log(response.data)
        this.guestServices = this.guestServices.filter(
            (t) => t.id !== id);
      })
      if(this.guestServiceInfoQuantity===1){
        let temporalRoom=this.room
        temporalRoom.servicePending=false
        new RoomServices().updateRoom(this.token, this.room.id,temporalRoom).then(response=>{
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
        new FoodServices().getFoodServiceByRoomId(this.token,id).then(response=>{
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
              this.room=[]
              this.rooms[i].guestStayComplete=true
              this.room=this.rooms[i]
              this.editRoom()
            }
          }
        }
      }, 30000);
    },
    watchServices(){
      console.log("Watching services")
      this.interval = setInterval(() => {
        for(let i=0;i<this.rooms.length;i++){
          if(this.rooms[i].guestStayComplete===false){
            new RoomServices().getRoomForGuest(this.token,this.rooms[i].guestId).then(response=>{
              if(response.data.emergency===true){
                this.rooms[i].emergency=true
              }if(response.data.emergency===false){
                this.rooms[i].emergency=false
              }
              if(response.data.servicePending!==false){
                this.rooms[i].servicePending=response.data.servicePending
                this.setVisibleNotifications()
              }else {
                this.rooms[i].servicePending=false
              }
            })
          }
        }
      }, 9000);
    },
    increaseProgress(i){
      let format=this.rooms[i].endDate.split("/")
      let goalDate=(format[1]+"/"+format[0]+"/"+format[2])
      this.rooms[i].progressTime=this.getProgressTimeForGuest(goalDate,this.rooms[i].totalTime)
      console.log("ProgressBar update")
    },


    /////////////////
      validateCalendarDate(firstDayDate,lastDayDate){
          let day1 = new Date(firstDayDate);
          let day2 = new Date(lastDayDate);

          if((day2.getMonth()+1)<(day1.getMonth()+1) && day2.getFullYear()<=day1.getFullYear() ||
              (day2.getMonth()+1)===(day1.getMonth()+1) && day2.getDate()<day1.getDate() && day2.getFullYear()<=day1.getFullYear()){
              return false
          }else{
              return true
          }
      },
      getDiferenceDays(firstDayDate,lastDayDate){
          let day1 = new Date(firstDayDate);
          let day2 = new Date(lastDayDate);

          let totalDifference= Math.abs(day2-day1);
          let totalDays = totalDifference/(1000 * 3600 * 24)

          return totalDays
      },
      register(){

          const date = new Date();

          let actualDay= date.getDate()
          let actualMonth= date.getMonth()

          let firstDayDate= (actualMonth+1)+"/"+actualDay+"/"+date.getFullYear()
          let lastDayDate= (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear()

          let guestEmitter= {
              userEmail: this.email,
              userPassword: this.password,
              userName: this.name,
              endDate:this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear(),
              lastDay:this.endDate.getDate(),
              firstDayDate: (actualMonth + 1) + "/" + actualDay + "/" + date.getFullYear(),
              lastDayDate: (this.endDate.getMonth() + 1) + "/" + this.endDate.getDate() + "/" + this.endDate.getFullYear(),
              price: this.setPrice(firstDayDate, lastDayDate),
          }
          this.registerGuestDialog=false
          this.editRoomAuxiliaryId=parseInt(sessionStorage.getItem("temporaryRoomId"))
          console.log("this.editRoomAuxiliaryId: "+this.editRoomAuxiliaryId )
          console.log("Romiews: "+this.rooms )
          let id=this.findIndexById(this.editRoomAuxiliaryId)
          console.log("id index: "+id)

          let guestRegister={
              roomId: this.rooms[id].id,
              name: guestEmitter.userName,
              email: guestEmitter.userEmail,
              password: guestEmitter.userPassword,
              initialDate: this.rooms[id].initialDate=actualDay+"/"+(actualMonth+1)+"/"+date.getFullYear(),
              endDate:guestEmitter.endDate,
              price:guestEmitter.price
          }
          new UserServices().register(guestRegister.email,guestRegister.password,'none',guestRegister.name,'guest').then(response=>{
              new RoomServices().registerGuest(this.token,this.rooms[id].id,guestRegister).then(response=>{
                  console.log("EL ROOM FOR GUEST: "+response.data)
                  this.rooms[id].guestName=guestRegister.name
                  this.rooms[id].guestId=response.data
                  this.rooms[id].status=false
                  this.rooms[id].initialDate=actualDay+"/"+(actualMonth+1)+"/"+date.getFullYear()
                  this.rooms[id].endDate=guestEmitter.endDate
                  this.rooms[id].price=guestEmitter.price
                  this.rooms[id].emergency=false
                  this.rooms[id].guestStayComplete=false
                  this.rooms[id].totalTime=this.setTotalTimeForGuest(guestEmitter.firstDayDate,guestEmitter.lastDayDate)
                  this.rooms[id].progressTime=this.getProgressTimeForGuest(guestEmitter.lastDayDate,this.rooms[id].totalTime)
                  this.setGuestInfo()//AQUI ESTA MI ERROR
                  console.log("Guest added successfully")
                  this.$toast.add({severity:'success', summary: 'Usuario Registrado', detail:'Se registro el usuario correctamente', life: 3000});
              })
          })
      },
      setPrice(firstDayDate,lastDayDate){
          let day1 = new Date(firstDayDate);
          let day2 = new Date(lastDayDate);

          let difference= Math.abs(day2-day1);
          let days = difference/(1000 * 3600 * 24)
          let totalPrice=days*this.price

          return totalPrice
      },
      ResumeDialogData(){
          const date = new Date();
          let actualDay= date.getDate()
          let actualMonth= date.getMonth()
          let firstDayDate= (actualMonth+1)+"/"+actualDay+"/"+date.getFullYear()
          let lastDayDate= (this.endDate.getMonth()+1)+"/"+this.endDate.getDate()+"/"+this.endDate.getFullYear()

          if (this.validateCalendarDate(firstDayDate,lastDayDate)){
              this.visibleDateDialog=false
              this.visibleResumeDateGuest=true
              this.resumeInitialDate= actualDay+"/"+(actualMonth+1)+"/"+date.getFullYear()
              this.resumeEndDate=this.endDate.getDate()+"/"+(this.endDate.getMonth()+1)+"/"+this.endDate.getFullYear()
              this.resumePrice=this.setPrice(firstDayDate,lastDayDate)
              this.resumeHotelDays=this.getDiferenceDays(firstDayDate,lastDayDate)
          }else{
              this.$toast.add({severity:'error', summary: 'Fecha antigua', detail:'Seleccione una fecha valida', life: 3000});
          }

      },
      Cancel(){
          this.visibleResumeDateGuest=false
          this.visibleFormDialog=true
          this.name=""
          this.email=""
          this.password=""
          this.endDate=null
          this.price=84
          this.resumeDateGuest=false
          this.resumeInitialDate=null
          this.resumeEndDate=null
          this.resumePrice=null
          this.resumeHotelDays=null
      },
      showDateDialog(){
          this.visibleFormDialog=false
          this.visibleDateDialog=true
      }


  },
  mounted() {
    this.startProgress()
    this.watchServices()

  }
};
</script>

<style scoped>
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.containerRegister {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
}
.registerContainer {
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}
.inputsContainer {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 80%;
}
.buttonRegister {
    width: fit-content;
    padding-left: 50px;
    padding-right: 50px;
    color: white;
    background-color: #D6A049;
    border-radius: 25px;
}
.inputRegister {
    background-color: white;
    border-radius: 15px;
    color: black;
}
.inputRegister::placeholder {
    color: black;
}
</style>
