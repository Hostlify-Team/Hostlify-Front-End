import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from "@/locals/i18n";
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import InputNumber from 'primevue/inputnumber';


//PrimeVue Styles
import "primevue/resources/themes/vela-orange/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"                           //icons

import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
import Carousel from 'primevue/carousel';
import Steps from 'primevue/steps';
import FileUpload from 'primevue/fileupload';
import DataView from 'primevue/dataview';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';


const app = createApp(App)

app.use(i18n)
app.use(PrimeVue);
app.use(router)
app.use(ToastService)
app.component("pv-button",Button)
app.component("pv-toast",Toast)
app.component("pv-data-table",DataTable)
app.component("pv-column",Column)
app.component("pv-column-group",ColumnGroup)
app.component("pv-row",Row)
app.component("pv-carousel",Carousel)
app.component("pv-steps",Steps)
app.component("pv-file-upload",FileUpload)
app.component("pv-data-view",DataView)
app.component("pv-sidebar",Sidebar)
app.component("pv-card",Card)
app.component("pv-input-text",InputText)
app.component("pv-dropdown",Dropdown)
app.component("pv-checkbox",Checkbox)
app.component("pv-input-switch",InputSwitch)
app.component("pv-password",Password)
app.component("pv-radio-button",RadioButton)
app.component("pv-input-number",InputNumber)



app.mount('#app')
