<template>
  <div>
    <DataTable
        :value="histories"
        responsiveLayout="scroll"
        v-model:filters="filters"
    >
      <template #header>
        <div class="history-table-header">
          <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              class="p-button-outlined"
              @click="clearFilter()"
          />
          <span class="p-input-icon-left history-table-header-input">
            <i class="pi pi-search" />
<InputText
    v-model="filters['global'].value"
    placeholder="Keyword Search"
    color="white"
/>
          </span>
        </div>
      </template>
      <Column field="number" header="Number" :sortable="true"></Column>
      <Column field="guest" header="Guest" :sortable="true"></Column>
      <Column field="date" header="Date" :sortable="true"></Column>
      <Column field="price" header="Price" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
export default {
  components: {
    Column,
    DataTable,
    Button,
    InputText,
  },
  data() {
    return {
      histories: [
        {
          number: "1",
          guest: "Nombre de ejemplo",
          date: "14/09/2022",
          price: "15 PEN",
        },
        {
          number: "2",
          guest: "Nombre de ejemplo",
          date: "1/09/2022",
          price: "50 PEN",
        },
        {
          number: "3",
          guest: "Nombre de ejemplo",
          date: "23/09/2022",
          price: "45 PEN",
        },
      ],
      filters: null,
    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    clearFilter() {
      this.initFilters();
    },
  },
};
</script>
<style scoped>
.history-table-header {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

</style>