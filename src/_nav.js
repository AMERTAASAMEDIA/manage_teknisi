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
        name: 'Data Tiket',
        to: '/ticketing',
        icon: 'cil-pencil',
    },
    {
        component: 'CNavItem',
        name: 'Teknisi',
        to: '/list_material',
        icon: 'cil-airplay',
    },
    {
        component: 'CNavItem',
        name: 'Material(Ketersediaan)',
        to: '/list_material',
        icon: 'cil-airplay',
    },
    {
        component: 'CNavTitle',
        name: 'Transaksi',
    },
    {
        component: 'CNavItem',
        name: 'Tiket(on-progress)',
        to: '/item',
        icon: 'cil-pencil',
    },
    {
        component: 'CNavItem',
        name: 'Project Infra',
        to: '/item',
        icon: 'cil-drop',
    },
    {
        component: 'CNavGroup',
        name: 'Management Internet',
        to: '/buttons',
        icon: 'cil-cursor',
        items: [{
                component: 'CNavItem',
                name: '1',
                to: '/transaksi_logistik',
            },
            {
                component: 'CNavItem',
                name: '2',
                to: '/list_pengadaan',
            },
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
                name: 'Pemasangan Baru',
                to: '/laporan_aset',
            },
            {
                component: 'CNavItem',
                // name: 'Keluar & masuk barang(CM)',
                name: 'Tiket Komplain',

                to: '/laporan_keluar_masuk',
            },
            {
                component: 'CNavItem',
                name: 'Progress Infra',
                to: '/laporan_aset',
            },
            {
                component: 'CNavItem',
                name: 'Dismantling',
                to: '/laporan_aset',
            }
        ],
    },
]