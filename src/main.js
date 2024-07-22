import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
// Plugin Tampilan 
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
// import VueCurrencyFilter from 'vue-currency-filter'
// Unused 
// import JwPagination from 'jw-vue-pagination';
// import Table from 'data-table-vue-v3';


// option for input 

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)
    // Plugin Tampilan 
app.use(VueSweetalert2)


app.use(store).mount('#app')