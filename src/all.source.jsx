
const localhost = "http://localhost:4000/api/";


// List API 
// Master Item 
const getDataItem = localhost + `Master_item/MasterItem/getdata/AMERTA-PASURUAN`;
const getDataItemBySatuanPCS = localhost + `Master_item/MasterItem/getdataBySatuan/AMERTA-PASURUAN/PCS`;
const getDataItemBySatuanMeter = localhost + `Master_item/MasterItem/getdataBySatuan/AMERTA-PASURUAN/Meter`;
const getDataItemByName = localhost + `Master_item/MasterItem/getbyname/`;
const getDataItemById = localhost + `Master_item/MasterItem/getbyid/`;
const createDataItem = localhost + `Master_item/MasterItem/create`;
const updateDataItem = localhost + `Master_item/MasterItem/updatebyid/`;
const updateDataItemHistoryKabel = localhost + `Master_item/MasterItem/updatebyidItemStok&HistoryKabel/`;

const updateDataItemGambar = localhost + `Master_item/MasterItem/updatebyidgambar/`;

const updateDataItemByName = localhost + `Master_item/MasterItem/updatebyname/`;
const updateDataHistoryItemByid = localhost + `Master_item/MasterItem/updatebyidItemHistory/`;
const updateDataHistoryItemByName = localhost + `Master_item/MasterItem/updatebyidItemHistoryByName/`;
const updateDataItemListByid = localhost + `Master_item/MasterItem/updatebyidItemlist/`
// Master List Item 
const getDataListItem = localhost + `Master_list_item/MasterListItem/getdata/AMERTA-PASURUAN`;
const getDataListItemById= localhost + `Master_list_item/MasterListItem/getbyid/`;
const getDataListItemByName = localhost + `Master_list_item/MasterListItem/getbyname/`; 
const createDataListItem= localhost + `Master_list_item/MasterListItem/create`;
const updateDataListItemById = localhost + `Master_list_item/MasterListItem/updatebyid/`;
const updateDataListItemHistoryById = localhost + `Master_list_item/MasterListItem/updatebyidItemHistory/`;

// Master Supplier 
const getDataSupplier = localhost + `Master_supplier/MasterSupplier/getdata `;
const createDataSupplier = localhost + `Master_supplier/MasterSupplier/create`;
const getDataByIdSupplier = localhost + `Master_supplier/MasterSupplier/getbyid/`;
const updateDataSupplier = localhost + `Master_supplier/MasterSupplier/updatebyid/`;

// Master list data material 
const getDataHargaMaterial = localhost + `Master_harga_material/MasterHargaMaterial/getdata/AMERTA-PASURUAN`;
const createDataHargaMaterial = localhost + `Master_harga_material/MasterHargaMaterial/create`;
const getDataHargaMaterialById = localhost + `Master_harga_material/MasterHargaMaterial/getbyid/`;
const updateDataHargaMaterial = localhost + `Master_harga_material/MasterHargaMaterial/updatebyid/`;


// Aset pengadaan barang 
const getDataPengadaanBarang = localhost + `Master_pengadaan_barang/MasterPengadaanBarang/getdata/AMERTA-PASURUAN`;
const createDataPengadaanBarang = localhost + `Master_pengadaan_barang/MasterPengadaanBarang/create`;
const getDataPengadaanBarangById = localhost + `Master_pengadaan_barang/MasterPengadaanBarang/getbyid/`;
const updateDataPengadaanBarang = localhost + `Master_pengadaan_barang/MasterPengadaanBarang/updatebyid/`;

// Transaksi Logistik 
const getDataTransaksiLogistik = localhost + `Tr_logistic/Trlogistic/getdata/AMERTA-PASURUAN`;
const getDataTransaksiLogistikMasukFilterTanggal = localhost + `Tr_logistic/Trlogistic/getbyidtanggal/AMERTA-PASURUAN/`;
const createDataTransaksiLogistik = localhost + `Tr_logistic/Trlogistic/create`;
const createDataTransaksiLogistikImage = localhost + `Tr_logistic/Trlogistic/creategambar`;
const getDataTransaksiLogistikById = localhost + `Tr_logistic/Trlogistic/getbyid/`;
const updateDataTransaksiLogistikById = localhost + `Tr_logistic/Trlogistic/updatebyid/`;

// Transaksi logistik keluar 
const getDataTransaksiLogistikKeluar = localhost + `Tr_logistic_keluar/TrLogisticKeluar/getdata/AMERTA-PASURUAN`;
const getDataTransaksiLogistikKeluarTypeKabel = localhost + `Tr_logistic_keluar/TrLogisticKeluar/getdatatype/AMERTA-PASURUAN/METER`;
const getDataTransaksiLogistikKeluarTypeAlat = localhost + `Tr_logistic_keluar/TrLogisticKeluar/getdatatype/AMERTA-PASURUAN/PCS`;
const createDataTransaksiLogistikKeluar = localhost + `Tr_logistic_keluar/TrLogisticKeluar/create`;
const getDataTransaksiLogistikKeluarbyId = localhost + `Tr_logistic_keluar/TrLogisticKeluar/getbyid/`;
const updateDataTransaksiLogistikKeluarById = localhost + `Tr_logistic_keluar/TrLogisticKeluar/updatebyid/`

// Transaksi QC 
const getDataTransaksiQC = localhost + `Tr_qc/TrQC/getdata/AMERTA-PASURUAN`;
const createDataTransaksiQC= localhost + `Tr_qc/TrQC/create`;
const createDataTransaksiQcGambar = localhost + `Tr_qc/TrQC/createimage`
const getDataTransaksiQCDetail= localhost + `Tr_qc/TrQC/getbyid/`;




export default {
    // Master item 
    getDataItem,
    getDataItemBySatuanPCS,
    getDataItemBySatuanMeter,
    getDataItemById,
    getDataItemByName,
    createDataItem,
    updateDataItem,
    updateDataItemGambar,
    updateDataItemByName,
    updateDataHistoryItemByid,
    updateDataItemHistoryKabel,
    updateDataHistoryItemByName,
    updateDataItemListByid,
    // Master List Item 
    getDataListItem,
    getDataListItemById,
    getDataListItemByName,
    createDataListItem,
    updateDataListItemById,
    updateDataListItemHistoryById,
    // Master supplier 
    getDataSupplier,
    createDataSupplier,
    getDataByIdSupplier,
    updateDataSupplier,
    // Master list data material 
    getDataHargaMaterial,
    createDataHargaMaterial,
    getDataHargaMaterialById,
    updateDataHargaMaterial,
    

    // Aset pengadaan barang 
    getDataPengadaanBarang,
    createDataPengadaanBarang,
    getDataPengadaanBarangById,
    updateDataPengadaanBarang,

    // TRANSAKSI LOGISTIK 
    getDataTransaksiLogistik,
    getDataTransaksiLogistikMasukFilterTanggal,
    createDataTransaksiLogistik,
    createDataTransaksiLogistikImage,
    getDataTransaksiLogistikById,
    updateDataTransaksiLogistikById,

    // Transaksi Logistik keluar 
    getDataTransaksiLogistikKeluar,
    getDataTransaksiLogistikKeluarTypeKabel,
    getDataTransaksiLogistikKeluarTypeAlat,
    createDataTransaksiLogistikKeluar,
    getDataTransaksiLogistikKeluarbyId,
    updateDataTransaksiLogistikKeluarById,
    // TRANSAKSI QC
    getDataTransaksiQC,
    createDataTransaksiQC,
    createDataTransaksiQcGambar,
    getDataTransaksiQCDetail
}