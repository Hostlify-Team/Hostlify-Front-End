<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="showDeleteRoomsDialog"
                     :disabled="!selectedRooms || !selectedRooms.length"/>
        </template>

        <template #end>
          <pv-button label="Exportar" icon="pi pi-download" class="p-button-help" style="margin-left: 1rem" @click="exportToCSV($event)"/>
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
        <pv-column field="guestName" header="Huesped" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <p v-if="slotProps.data.guestId!==null">{{slotProps.data.guestName}}</p>
          </template>
        </pv-column>
        <pv-column field="initialDate" header="Fecha de ingreso" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="endDate" header="Fecha de salida" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="price" header="Precio" :sortable="true" style="min-width: 16rem">
          <template #body="slotProps">
            <p v-if="slotProps.data.price!==null">S/. {{slotProps.data.price}}</p>
          </template>
        </pv-column>

        <pv-dialog v-model:visible="deleteRoomsDialog" :style="{ width: '450px' }" header="Eliminar las habitaciones" :modal="true">
          <span>Quieres eliminiar las habitaciones seleccionadas?</span>
          <template #footer>
            <pv-button :label="'No'.toUpperCase()" icon="pi pi-times" class="p-button-text" @click="hideAnyDialog" />
            <pv-button :label="'Yes'.toUpperCase()" icon="pi pi-check" class="p-button-text" @click="deleteRooms" />
          </template>
        </pv-dialog>

      </pv-data-table>
    </div>
  </div>
</template>

<script>
import {HistoryServices} from "../services/history-services";
import {UserServices} from "../services/user-services";
import { FilterMatchMode } from "primevue/api";

export default {
  data() {
    return {
      rooms:[],
      deleteRoomDialog:false,
      deleteRoomsDialog:false,
      room:{},
      selectedRooms:null,
      filters: {},
      submitted: false
    };
  },
  created() {
    new HistoryServices().getHistoryForManager(sessionStorage.getItem("id")).then(response=>{
      this.rooms=response.data
      console.log("Rooms",this.rooms)
    })
    this.initFilters();
  },
  methods: {
    showDeleteRoomsDialog() {
      this.deleteRoomsDialog = true
    },
    deleteRoom() {
      new HistoryServices().deleteRoomHistory(this.room.id).then(response => {
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
        new HistoryServices().deleteRoomHistory(room.id).then((response) => {
          this.rooms = this.rooms.filter(
              (t) => t.id !== room.id
          );
          console.log(response);
        });
      });
      this.deleteRoomsDialog = false;
    },
    hideAnyDialog() {
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
  }
};
</script>
<style scoped>
.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}
</style>