// const localhost = "http://localhost:4000/api/";


const  Server = "http://localhost:4000/api/";
// const Server = "http://77.37.47.90:4000/api/";


// List API 
// Master Item 
const getDataItem = Server + `Master_item/MasterItem/getdata/`;
const getDataItemBySatuanPCS = Server + `Master_item/MasterItem/getdataBySatuan/`;
const getDataItemBySatuanMeter = Server + `Master_item/MasterItem/getdataBySatuan/`;
const getDataItemByName = Server + `Master_item/MasterItem/getbyname/`;
const getDataItemById = Server + `Master_item/MasterItem/getbyid/`;
const createDataItem = Server + `Master_item/MasterItem/create`;
const updateDataItem = Server + `Master_item/MasterItem/updatebyid/`;
const updateDataItemHistoryKabel = Server + `Master_item/MasterItem/updatebyidItemStok&HistoryKabel/`;

const updateDataItemGambar = Server + `Master_item/MasterItem/updatebyidgambar/`;

const updateDataItemByName = Server + `Master_item/MasterItem/updatebyname/`;
const updateDataHistoryItemByid = Server + `Master_item/MasterItem/updatebyidItemHistory/`;
const updateDataHistoryItemByName = Server + `Master_item/MasterItem/updatebyidItemHistoryByName/`;
const updateDataItemListByid = Server + `Master_item/MasterItem/updatebyidItemlist/`
// Master List Item 
const getDataListItem = Server + `Master_list_item/MasterListItem/getdata/`;
const getDataListItemById= Server + `Master_list_item/MasterListItem/getbyid/`;
const getDataListItemByName = Server + `Master_list_item/MasterListItem/getbyname/`; 
const createDataListItem= Server + `Master_list_item/MasterListItem/create`;
const updateDataListItemById = Server + `Master_list_item/MasterListItem/updatebyid/`;
const updateDataListItemHistoryById = Server + `Master_list_item/MasterListItem/updatebyidItemHistory/`;

// Master Supplier 
const getDataSupplier = Server + `Master_supplier/MasterSupplier/getdata `;
const createDataSupplier = Server + `Master_supplier/MasterSupplier/create`;
const getDataByIdSupplier = Server + `Master_supplier/MasterSupplier/getbyid/`;
const updateDataSupplier = Server + `Master_supplier/MasterSupplier/updatebyid/`;

// Master list data material 
const getDataHargaMaterial = Server + `Master_harga_material/MasterHargaMaterial/getdata/`;
const createDataHargaMaterial = Server + `Master_harga_material/MasterHargaMaterial/create`;
const getDataHargaMaterialById = Server + `Master_harga_material/MasterHargaMaterial/getbyid/`;
const updateDataHargaMaterial = Server + `Master_harga_material/MasterHargaMaterial/updatebyid/`;


// Aset pengadaan barang 
const getDataPengadaanBarang = Server + `Master_pengadaan_barang/MasterPengadaanBarang/getdata/`;
const createDataPengadaanBarang = Server + `Master_pengadaan_barang/MasterPengadaanBarang/create`;
const getDataPengadaanBarangById = Server + `Master_pengadaan_barang/MasterPengadaanBarang/getbyid/`;
const updateDataPengadaanBarang = Server + `Master_pengadaan_barang/MasterPengadaanBarang/updatebyid/`;

// Transaksi Logistik 
const getDataTransaksiLogistik = Server + `Tr_logistic/Trlogistic/getdata/`;
const getDataTransaksiLogistikMasukFilterTanggal = Server + `Tr_logistic/Trlogistic/getbyidtanggal/`;
const createDataTransaksiLogistik = Server + `Tr_logistic/Trlogistic/create`;
const createDataTransaksiLogistikImage = Server + `Tr_logistic/Trlogistic/creategambar`;
const getDataTransaksiLogistikById = Server + `Tr_logistic/Trlogistic/getbyid/`;
const updateDataTransaksiLogistikById = Server + `Tr_logistic/Trlogistic/updatebyid/`;

// Transaksi logistik keluar 
const getDataTransaksiLogistikKeluar = Server + `Tr_logistic_keluar/TrLogisticKeluar/getdata/AMERTA-PASURUAN`;
const getDataTransaksiLogistikKeluarTypeKabel = Server + `Tr_logistic_keluar/TrLogisticKeluar/getdatatype/`;
const getDataTransaksiLogistikKeluarTypeAlat = Server + `Tr_logistic_keluar/TrLogisticKeluar/getdatatype/`;
const createDataTransaksiLogistikKeluar = Server + `Tr_logistic_keluar/TrLogisticKeluar/create`;
const getDataTransaksiLogistikKeluarbyId = Server + `Tr_logistic_keluar/TrLogisticKeluar/getbyid/`;
const updateDataTransaksiLogistikKeluarById = Server + `Tr_logistic_keluar/TrLogisticKeluar/updatebyid/`;

// Transaksi QC 
const getDataTransaksiQC = Server + `Tr_qc/TrQC/getdata/AMERTA-PASURUAN`;
const createDataTransaksiQC= Server + `Tr_qc/TrQC/create`;
const createDataTransaksiQcGambar = Server + `Tr_qc/TrQC/createimage`
const getDataTransaksiQCDetail= Server + `Tr_qc/TrQC/getbyid/`;


// Transaksi Reinput 
const getDataTransaksiReinput = Server + `Tr_reinput/Trreinput/getdata/`;
const createDataTransaksiReinput = Server + `Tr_reinput/Trreinput/create`;




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
    getDataTransaksiQCDetail,

    // Transaksi reinput 
    getDataTransaksiReinput,
    createDataTransaksiReinput
}