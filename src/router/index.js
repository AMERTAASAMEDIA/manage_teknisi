import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import store from '../store'

const routes = [{
        path: '/',
        name: 'Home',
        component: DefaultLayout,
        redirect: '/dashboard',
        meta: {
            requiresAuth: true,
            roles: ['KOORDINATOR'],
        },
        children: [{
                path: '/dashboard',
                name: 'Dashboard',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "dashboard" */ '@/views/dashboard/Dashboard.vue'),
            },
            // Amerta Logistik On progress
            {
                path: '/item',
                name: 'Item',
                component: () =>
                    import ('@/views/Amerta_logistik/item/data_item.vue'),
                // redirect: '/item',
            },
            {
                path: '/kabel',
                name: 'Kabel',
                component: () =>
                    import ('@/views/Amerta_logistik/item/data_item_meter.vue'),
            },
            {
                path: '/item_pcs',
                name: 'ItemPcs',
                component: () =>
                    import ('@/views/Amerta_logistik/item/data_item_pcs.vue'),
            },
            {
                path: '/input_kabel/:id',
                name: 'InputKabel',
                component: () =>
                    import ('@/views/Amerta_logistik/item/create_input_kabel.vue'),
            },
            {
                path: '/alokasi_barang/:id',
                name: 'AlokasiBarang',
                component: () =>
                    import ('@/views/Amerta_logistik/alokasi_barang/tambah_alokasi_barang.vue'),
            },
            {
                path: '/history_pembelian/:id',
                name: 'HistoryPembelian',
                component: () =>
                    import ('@/views/Amerta_logistik/item/History/history_pembelian.vue'),
            },
            {
                path: '/history_pemakaian/:id',
                name: 'HistoryPemakaian',
                component: () =>
                    import ('@/views/Amerta_logistik/item/History/history_pemakaian.vue'),
            },
            {
                path: '/history_pemakaian_list/:id',
                name: 'HistoryPemakaianList',
                component: () =>
                    import ('@/views/Amerta_logistik/item/History/history_pemakaian_list.vue'),
            },
            // {
            //   path: '/history_penjualan/:id',
            //   name: 'HistoryPenjualan',
            //   component: () => import('@/views/Amerta_logistik/item/History/history_penjualan.vue'),
            // },
            {
                path: '/list_satuan_barang/:name',
                name: 'ListSatuanBarang',
                component: () =>
                    import ('@/views/Amerta_logistik/item/History/list_satuan_barang.vue'),
            },
            {
                path: '/input_kode_sn/:id',
                name: 'InputKodeSn',
                component: () =>
                    import ('@/views/Amerta_logistik/item/History/input_kode_sn.vue'),
            },
            {
                path: '/supplier',
                name: 'Supplier',
                component: () =>
                    import ('@/views/Amerta_logistik/supplier/data_supplier.vue'),
                // redirect: '/item',
            },
            {
                path: '/ticketing',
                name: 'Ticketing',
                component: () =>
                    import ('@/views/Amerta_koordinator/ticketing/Table/table.vue'),
                // redirect: '/item',
            },
            {
                path: '/teknisi',
                name: 'Teknisi',
                component: () =>
                    import ('@/views/Amerta_koordinator/teknisi/Table/table.vue'),
                // redirect: '/item',
            },
            {
                path: '/project_infra',
                name: 'ProjectInfra',
                component: () =>
                    import ('@/views/Amerta_koordinator/project_infra/Table/table.vue'),
                // redirect: '/item',
            },
            {
                path: '/psb',
                name: 'PSB',
                component: () =>
                    import ('@/views/Amerta_koordinator/psb/Table/table.vue'),
                // redirect: '/item',
            },
            {
                path: '/maintenance',
                name: 'Maintenance',
                component: () =>
                    import ('@/views/Amerta_koordinator/mt/Table/table.vue'),
                // redirect: '/item',
            },
            // {
            //     path: '/edit-supplier/:id',
            //     name: 'EditSupplier',
            //     component: () =>
            //         import ('@/views/Amerta_logistik/supplier/edit_supplier.vue'),
            //     // redirect: '/item',
            // },
            {
                path: '/edit-ticketing/:id',
                name: 'EditTicketing',
                component: () =>
                    import ('@/views/Amerta_koordinator/ticketing/Form/update.vue'),
                // redirect: '/item',
            },
            {
                path: '/pengerjaan-ticketing/:id',
                name: 'PengerjaanTicketing',
                component: () =>
                    import ('@/views/Amerta_koordinator/ticketing/Form/pengerjaan.vue'),
                // redirect: '/item',
            },
            {
                path: '/edit-infra/:id',
                name: 'EditInfra',
                component: () =>
                    import ('@/views/Amerta_koordinator/project_infra/Form/update.vue'),
                // redirect: '/item',
            },
            {
                path: '/edit-teknisi/:id',
                name: 'EditTeknisi',
                component: () =>
                    import ('@/views/Amerta_koordinator/teknisi/Form/update.vue'),
                // redirect: '/item',
            },
            {
                path: '/list_material',
                name: 'ListMaterial',
                component: () =>
                    import ('@/views/Amerta_logistik/list_harga_material/list_harga_material.vue'),
            },
            {
                path: '/tambah_list_material',
                name: 'TambahListMaterial',
                component: () =>
                    import ('@/views/Amerta_logistik/list_harga_material/tambah_list_harga_material.vue'),
            },
            {
                path: '/edit_list_material/:id',
                name: 'EditListMaterial',
                component: () =>
                    import ('@/views/Amerta_logistik/list_harga_material/edit_list_harga_material.vue'),
            },
            {
                path: '/list_pengadaan',
                name: 'ListPengadaan',
                component: () =>
                    import ('@/views/Amerta_logistik/pengadaan/data_pengadaan.vue'),
            },
            {
                path: '/transaksi_logistik',
                name: 'TransaksiLogistik',
                component: () =>
                    import ('@/views/Amerta_logistik/transaksi_logistik/transaksi_logistik.vue'),
            },
            {
                path: '/detail_transaksi_logistik/:id',
                name: 'DetailTransaksiLogistik',
                component: () =>
                    import ('@/views/Amerta_logistik/transaksi_logistik/detail_logistik.vue'),
            },
            {
                path: '/tambah_transaksi_logistik',
                name: 'TambahTransaksiLogistik',
                component: () =>
                    import ('@/views/Amerta_logistik/transaksi_logistik/tambah_logistik.vue'),
            },
            {
                path: '/update_transaksi_qc/:id',
                name: 'UpdateTransaksiQc',
                component: () =>
                    import ('@/views/Amerta_logistik/qc/Tr_qc.vue'),
            },
            {
                path: '/list_transaksi_qc',
                name: 'ListTransaksiQc',
                component: () =>
                    import ('@/views/Amerta_logistik/qc/list_qc.vue'),
            },
            {
                path: '/list_transaksi_pengeluaran',
                name: 'ListTransaksiPengeluaran',
                component: () =>
                    import ('@/views/Amerta_logistik/alokasi_barang/table_alokasi_barang.vue'),
            },
            // Kumpulan laporan
            {
                path: '/laporan_keluar_masuk',
                name: 'LaporanKeluarMasuk',
                component: () =>
                    import ('@/views/Amerta_logistik/Laporan/Laporan_keluar_masuk/laporan_keluar_masuk.vue'),
            },
            {
                path: '/laporan_pemakaian_kabel',
                name: 'LaporanPemakaianKabel',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/laporan_pemakaian_kabel/laporan_pemakaian_kabel.vue'
                    ),
            },
            {
                path: '/laporan_pemakaian_kabel_bulanan',
                name: 'LaporanPemakaianKabelBulanan',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/laporan_pemakaian_kabel/laporan_pemakaian_kabel_bulanan.vue'
                    ),
            },
            {
                path: '/laporan_pemakaian_alat',
                name: 'LaporanPemakaianAlat',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/laporan_pemakaian_alat/laporan_pemakaian_alat.vue'
                    ),
            },
            {
                path: '/laporan_pemakaian_alat_bulanan',
                name: 'LaporanPemakaianAlatBulanan',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/laporan_pemakaian_alat/laporan_pemakaian_alat_bulanan.vue'
                    ),
            },
            {
                path: '/laporan_reinput',
                name: 'LaporanReinput',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/Laporan_reinput/laporan_reinput.vue'
                    ),
            },
            {
                path: '/laporan_reinput_bulanan',
                name: 'LaporanReinputBulanan',
                component: () =>
                    import (
                        '@/views/Amerta_logistik/Laporan/Laporan_reinput/laporan_reinput_bulanan.vue'
                    ),
            },
            {
                path: '/laporan_aset',
                name: 'LaporanAset',
                component: () =>
                    import ('@/views/Amerta_logistik/Laporan/Laporan_aset/laporan_aset.vue'),
            },
            // ----
            {
                path: '/theme',
                name: 'Theme',
                redirect: '/theme/typography',
            },
            {
                path: '/theme/colors',
                name: 'Colors',
                component: () =>
                    import ('@/views/theme/Colors.vue'),
            },
            {
                path: '/theme/typography',
                name: 'Typography',
                component: () =>
                    import ('@/views/theme/Typography.vue'),
            },
            {
                path: '/base',
                name: 'Base',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/base/breadcrumbs',
                children: [{
                        path: '/base/accordion',
                        name: 'Accordion',
                        component: () =>
                            import ('@/views/base/Accordion.vue'),
                    },
                    {
                        path: '/base/breadcrumbs',
                        name: 'Breadcrumbs',
                        component: () =>
                            import ('@/views/base/Breadcrumbs.vue'),
                    },
                    {
                        path: '/base/cards',
                        name: 'Cards',
                        component: () =>
                            import ('@/views/base/Cards.vue'),
                    },
                    {
                        path: '/base/carousels',
                        name: 'Carousels',
                        component: () =>
                            import ('@/views/base/Carousels.vue'),
                    },
                    {
                        path: '/base/collapses',
                        name: 'Collapses',
                        component: () =>
                            import ('@/views/base/Collapses.vue'),
                    },
                    {
                        path: '/base/list-groups',
                        name: 'List Groups',
                        component: () =>
                            import ('@/views/base/ListGroups.vue'),
                    },
                    {
                        path: '/base/navs',
                        name: 'Navs',
                        component: () =>
                            import ('@/views/base/Navs.vue'),
                    },
                    {
                        path: '/base/paginations',
                        name: 'Paginations',
                        component: () =>
                            import ('@/views/base/Paginations.vue'),
                    },
                    {
                        path: '/base/placeholders',
                        name: 'Placeholders',
                        component: () =>
                            import ('@/views/base/Placeholders.vue'),
                    },
                    {
                        path: '/base/popovers',
                        name: 'Popovers',
                        component: () =>
                            import ('@/views/base/Popovers.vue'),
                    },
                    {
                        path: '/base/progress',
                        name: 'Progress',
                        component: () =>
                            import ('@/views/base/Progress.vue'),
                    },
                    {
                        path: '/base/spinners',
                        name: 'Spinners',
                        component: () =>
                            import ('@/views/base/Spinners.vue'),
                    },
                    {
                        path: '/base/tables',
                        name: 'Tables',
                        component: () =>
                            import ('@/views/base/Tables.vue'),
                    },
                    {
                        path: '/base/tooltips',
                        name: 'Tooltips',
                        component: () =>
                            import ('@/views/base/Tooltips.vue'),
                    },
                ],
            },
            {
                path: '/buttons',
                name: 'Buttons',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/buttons/standard-buttons',
                children: [{
                        path: '/buttons/standard-buttons',
                        name: 'Buttons',
                        component: () =>
                            import ('@/views/buttons/Buttons.vue'),
                    },
                    {
                        path: '/buttons/dropdowns',
                        name: 'Dropdowns',
                        component: () =>
                            import ('@/views/buttons/Dropdowns.vue'),
                    },
                    {
                        path: '/buttons/button-groups',
                        name: 'Button Groups',
                        component: () =>
                            import ('@/views/buttons/ButtonGroups.vue'),
                    },
                ],
            },
            {
                path: '/forms',
                name: 'Forms',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/forms/form-control',
                children: [{
                        path: '/forms/form-control',
                        name: 'Form Control',
                        component: () =>
                            import ('@/views/forms/FormControl.vue'),
                    },
                    {
                        path: '/forms/select',
                        name: 'Select',
                        component: () =>
                            import ('@/views/forms/Select.vue'),
                    },
                    {
                        path: '/forms/checks-radios',
                        name: 'Checks & Radios',
                        component: () =>
                            import ('@/views/forms/ChecksRadios.vue'),
                    },
                    {
                        path: '/forms/range',
                        name: 'Range',
                        component: () =>
                            import ('@/views/forms/Range.vue'),
                    },
                    {
                        path: '/forms/input-group',
                        name: 'Input Group',
                        component: () =>
                            import ('@/views/forms/InputGroup.vue'),
                    },
                    {
                        path: '/forms/floating-labels',
                        name: 'Floating Labels',
                        component: () =>
                            import ('@/views/forms/FloatingLabels.vue'),
                    },
                    {
                        path: '/forms/layout',
                        name: 'Layout',
                        component: () =>
                            import ('@/views/forms/Layout.vue'),
                    },
                    {
                        path: '/forms/validation',
                        name: 'Validation',
                        component: () =>
                            import ('@/views/forms/Validation.vue'),
                    },
                ],
            },
            {
                path: '/charts',
                name: 'Charts',
                component: () =>
                    import ('@/views/charts/Charts.vue'),
            },
            {
                path: '/icons',
                name: 'Icons',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/icons/coreui-icons',
                children: [{
                        path: '/icons/coreui-icons',
                        name: 'CoreUI Icons',
                        component: () =>
                            import ('@/views/icons/CoreUIIcons.vue'),
                    },
                    {
                        path: '/icons/brands',
                        name: 'Brands',
                        component: () =>
                            import ('@/views/icons/Brands.vue'),
                    },
                    {
                        path: '/icons/flags',
                        name: 'Flags',
                        component: () =>
                            import ('@/views/icons/Flags.vue'),
                    },
                ],
            },
            {
                path: '/notifications',
                name: 'Notifications',
                component: {
                    render() {
                        return h(resolveComponent('router-view'))
                    },
                },
                redirect: '/notifications/alerts',
                children: [{
                        path: '/notifications/alerts',
                        name: 'Alerts',
                        component: () =>
                            import ('@/views/notifications/Alerts.vue'),
                    },
                    {
                        path: '/notifications/badges',
                        name: 'Badges',
                        component: () =>
                            import ('@/views/notifications/Badges.vue'),
                    },
                    {
                        path: '/notifications/modals',
                        name: 'Modals',
                        component: () =>
                            import ('@/views/notifications/Modals.vue'),
                    },
                    {
                        path: '/notifications/toasts',
                        name: 'Toasts',
                        component: () =>
                            import ('@/views/notifications/Toasts.vue'),
                    },
                ],
            },
            {
                path: '/widgets',
                name: 'Widgets',
                component: () =>
                    import ('@/views/widgets/Widgets.vue'),
            },
        ],
    },
    {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render() {
                return h(resolveComponent('router-view'))
            },
        },
        children: [{
                path: '404',
                name: 'Page404',
                component: () =>
                    import ('@/views/pages/Page404'),
            },
            {
                path: '500',
                name: 'Page500',
                component: () =>
                    import ('@/views/pages/Page500'),
            },
            {
                path: '/login',
                name: 'Login',
                component: () =>
                    import ('@/views/pages/Login'),
            },
            {
                path: 'register',
                name: 'Register',
                component: () =>
                    import ('@/views/pages/Register'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    // const { requiresAuth, roles } = to.meta
    const isAuthenticated = store.getters.isAuthenticated
    const userRole = store.getters.Auth_role
    if (to.meta.requiresAuth) {
        if (!to.meta.auth && !userRole) {
            next({ path: '/login' })
        } else if (to.meta.auth && userRole === 'KOORDINATOR') {
            next({ path: '/' })
        } else {
            next() 
        }
    } else {
        next()
    }
    console.log(isAuthenticated);
    console.log(to.meta.roles)
    console.log(to.meta.requiresAuth)
})

export default router