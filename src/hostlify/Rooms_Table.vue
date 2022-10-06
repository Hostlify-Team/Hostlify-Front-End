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
        <pv-column field="date" header="Fecha de ingreso" :sortable="true" style="min-width: 16rem"></pv-column>
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
        <pv-column field="time" header="Tiempo" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <pv-progress-bar :value="slotProps.data.time"></pv-progress-bar>
          </template>
        </pv-column>
        <pv-column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button label="registrar" @click="showRegisterGuestDialog(slotProps.data)"/>
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
            <span>Estas seguro que quieres eliminar la habitacion <b>{{ room.roomName }}</b>?</span>
          </div>
          <template #footer>
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Si'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteRoom" />
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

      </pv-data-table>
    </div>
  </div>
</template>

<script>
import {RoomServices} from "../services/room-services";
import {UserServices} from "../services/user-services";
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
    sessionStorage.setItem("id",1)
    new RoomServices().getRoomsForManager(sessionStorage.getItem("id")).then(response=>{
      this.rooms=response.data
      this.setGuestInfo()
      console.log("Rooms",this.rooms)
    })
    this.initFilters();
  },
  methods: {
    setGuestInfo(){
      for(let i=0;i<this.rooms.length;i++){
        if(this.rooms[i].guestId!==null){
          new UserServices().getUser(this.rooms[i].guestId).then(response=>{
            console.log(response.data.name)
            this.rooms[i].guestName=response.data.name
          })
        }else {
          this.rooms[i].guestName=null
        }
      }
    },
    showAddRoomDialog() {
      this.room = {}
      this.addRoomDialog = true
    },
    showEditRoomDialog(data) {
      this.room.id = data.id
      this.room.roomName = data.roomName
      this.room.managerId = data.managerId
      this.room.guestId = data.guestId
      this.room.status = data.status
      this.room.time = data.time
      this.room.date = data.date
      this.room.price = data.price
      this.room.image = data.image
      this.room.description = data.description
      this.editRoomDialog = true
    },
    showDeleteRoomDialog(data) {
      this.room.roomName = data.roomName
      this.room.id = data.id
      this.deleteRoomDialog = true
    },
    showDeleteRoomsDialog() {
      this.deleteRoomsDialog = true
    },
    showRegisterGuestDialog(data) {
      this.registerGuestDialog = true
      this.editRoomAuxiliaryId=data.id
      console.log("Room id: ",data.id,data.roomName)
    },
    addRoom() {
      this.room.managerId = sessionStorage.getItem("id")
      this.room.guestId = null
      this.room.status = true
      this.room.time = 0
      this.room.date = null
      this.room.price = null
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
        this.rooms[this.findIndexById(response.data.id)] = this.room
        this.room = {}
        this.editRoomDialog = false
      })
    },
    deleteRoom() {
      new RoomServices().deleteRoom(this.room.id).then(response => {
        this.rooms = this.rooms.filter(
            (t) => t.id !== this.room.id
        );
        this.room = {}
        console.log("room deleted successfully",response.data)
        this.deleteRoomDialog = false
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
    }
  },
  mounted() {
    this.emitter.on("register-form", response => {
      this.registerGuestDialog = response;
    });
    this.emitter.on("new-guest", response => {
      let id=this.findIndexById(this.editRoomAuxiliaryId)
      this.rooms[id].guestId=response.id
      this.rooms[id].date=response.date
      this.rooms[id].price=response.price
      this.rooms[id].time=response.time
      this.rooms[id].status=false
      new RoomServices().updateRoom(this.editRoomAuxiliaryId,this.rooms[id]).then(response=>{
        this.setGuestInfo()
        console.log("Guest added successfully",response.data)
        this.editRoomAuxiliaryId=null
      })
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
