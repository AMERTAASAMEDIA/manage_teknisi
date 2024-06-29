export default [{
        component: 'CNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
            color: 'primary',
            text: 'NEW',
        },
    },
    {
        component: 'CNavTitle',
        name: 'Data Master',
    },
    {
        component: 'CNavItem',
        name: 'Data Supplier',
        to: '/supplier',
        icon: 'cil-pencil',
    },
    {
        component: 'CNavItem',
        name: 'Data List Material',
        to: '/list_material',
        icon: 'cil-airplay',
    },
    {
        component: 'CNavTitle',
        name: 'Aset Amerta',
    },
    {
        component: 'CNavItem',
        name: 'Data Item(Box)',
        to: '/item',
        icon: 'cil-drop',
    },
    {
        component: 'CNavItem',
        name: 'Data  kabel',
        to: '/kabel',
        icon: 'cil-puzzle',
    },
    {
        component: 'CNavItem',
        name: 'Data Item(PCS)',
        to: '/item_pcs',
        icon: 'cil-drop',
    },
    {
        component: 'CNavTitle',
        name: 'Core Logistik',
    },
    // {
    //   component: 'CNavGroup',
    //   name: 'Base',
    //   to: '/base',
    //   icon: 'cil-puzzle',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Accordion',
    //       to: '/base/accordion',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Breadcrumbs',
    //       to: '/base/breadcrumbs',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Cards',
    //       to: '/base/cards',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Carousels',
    //       to: '/base/carousels',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Collapses',
    //       to: '/base/collapses',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'List Groups',
    //       to: '/base/list-groups',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Navs & Tabs',
    //       to: '/base/navs',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Paginations',
    //       to: '/base/paginations',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Placeholders',
    //       to: '/base/placeholders',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Popovers',
    //       to: '/base/popovers',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Progress',
    //       to: '/base/progress',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Spinners',
    //       to: '/base/spinners',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Tables',
    //       to: '/base/tables',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Tooltips',
    //       to: '/base/tooltips',
    //     },
    //   ],
    // },
    {
        component: 'CNavGroup',
        name: 'Transaksi Logistik',
        to: '/buttons',
        icon: 'cil-cursor',
        items: [
            // {
            //   component: 'CNavItem',
            //   name: 'Alokasi Barang',
            //   to: '/buttons/standard-buttons',
            // },
            {
                component: 'CNavItem',
                name: 'Pembelian Barang',
                to: '/transaksi_logistik',
            },
            {
                component: 'CNavItem',
                name: 'Permintaan Pengadaan',
                to: '/list_pengadaan',
            },
            // {
            //   component: 'CNavItem',
            //   name: 'Tahap QC',
            //   to: '/list_transaksi_qc',
            // },
        ],
    },

    {
        component: 'CNavTitle',
        name: 'Laporan',
    },
    {
        component: 'CNavGroup',
        name: 'Laporan',
        to: '/pages',
        icon: 'cil-calculator',
        items: [{
                component: 'CNavItem',
                name: 'Laporan Aset Saat ini',
                to: '/laporan_aset',
            },
            {
                component: 'CNavItem',
                // name: 'Keluar & masuk barang(CM)',
                name: 'Laporan Barang masuk',

                to: '/laporan_keluar_masuk',
            },
            // {
            //   component: 'CNavItem',
            //   // name: 'Keluar & masuk barang(CM)',
            //   name: 'Barang Masuk',

            //   to: '/laporan_barang_masuk',
            // },
        ],
    },
    {
        component: 'CNavGroup',
        name: 'Penggunaan Alat',
        to: '/pages',
        icon: 'cil-calculator',
        items: [{
                component: 'CNavItem',
                name: 'Harian',
                to: '/laporan_pemakaian_alat',
            },
            {
                component: 'CNavItem',
                name: 'Bulanan',
                to: '/laporan_pemakaian_alat_bulanan',
            },

        ],
    },
    {
        component: 'CNavGroup',
        name: 'Pemakaian Kabel',
        to: '/pages',
        icon: 'cil-calculator',
        items: [{
                component: 'CNavItem',
                name: 'Harian',
                to: '/laporan_pemakaian_kabel',
            },
            {
                component: 'CNavItem',
                name: 'Bulanan',
                to: '/laporan_pemakaian_kabel_bulanan',
            },

        ],
    },
    {
        component: 'CNavGroup',
        name: 'Reinput',
        to: '/pages',
        icon: 'cil-calculator',
        items: [{
                component: 'CNavItem',
                name: 'Harian',
                to: '/laporan_reinput',
            },
            {
                component: 'CNavItem',
                name: 'Bulanan',
                to: '/laporan_reinput_bulanan',
            },

        ],
    },
    // {
    //   component: 'CNavGroup',
    //   name: 'Pages',
    //   to: '/pages',
    //   icon: 'cil-calculator',
    //   items: [
    //     {
    //       component: 'CNavItem',
    //       name: 'Login',
    //       to: '/pages/login',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Register',
    //       to: '/pages/register',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Error 404',
    //       to: '/pages/404',
    //     },
    //     {
    //       component: 'CNavItem',
    //       name: 'Error 500',
    //       to: '/pages/500',
    //     },
    //   ],
    // },
]