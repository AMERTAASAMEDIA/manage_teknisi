import Axios from "axios"
import allSource from "../../../../all.source";
export default {
    data() {
        return {
            Visiblehapusdata: false,
            VisibleUpdatePesananData: false,
            VisibleGambar: false,
            data_item: "Transaksi Logistik(Keluar & Masuk barang)",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            detaildata: {},
            detailgambar: {}
        }
    },
    methods: {
        // Format rupiah 
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        // Visible data 
        updateStatusPengiriman(items) {
            this.VisibleUpdatePesananData = true
            this.detaildata = items
        },
        lihatgambar(items) {
            this.VisibleGambar = true
            this.detailgambar = "/images/" + items.Tr_logistic_gambar
        },
        hapusdata() {
            this.Visiblehapusdata = true
        },
        // ----
        // LIST DATA 
        getdata() {
            Axios.get(allSource.getDataTransaksiLogistik).then((response) => {
                this.list_item = response.data;
            })
        },
        // Pagination with computed 
        prev() {
            this.current--;
        },
        next() {
            this.current++;
        },
        //// FUngsi-Fungsi Berat seperti update data dan tambah item / tambah stok di master item ketika tidak ada barang dengan nama yang sama
        UpdateData() {
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                this.$swal.fire({
                    title: "Berhasil!",
                    text: "Perubahan Telah tersimpan",
                    icon: "success"
                });
                Axios.put(allSource.updateDataTransaksiLogistikById + this.detaildata._id, this.detaildata)
                    .then((response) => {
                        this.getdata()
                        if (response.data.Tr_logistic_status_tiba === 'Delivered') {
                            for (let index = 0; index < response.data.Tr_logistic_detail.length; index++) {
                                var items = response.data.Tr_logistic_detail[index];
                                Axios.get(allSource.getDataItemByName + items.Tr_detail_logistic_nama_barang)
                                    .then((hasil) => {
                                        // console.log(hasil)
                                        if (!hasil.data) {
                                            // console.log("Gak ada")
                                            let newData = {
                                                item_nama: response.data.Tr_logistic_detail[index].Tr_detail_logistic_nama_barang,
                                                item_stok: response.data.Tr_logistic_detail[index].Tr_detail_logistic_jumlah_barang,
                                                item_domain: "AMERTA-PASURUAN",
                                                item_harga: response.data.Tr_logistic_detail[index].Tr_detail_logistic_harga_barang,
                                                item_created: new Date().toISOString().slice(0, 10),
                                                item_updated: new Date().toISOString().slice(0, 10),
                                                item_user_updated: "ADMIN-PASURUAN",
                                                item_status: "Y",
                                                item_satuan: response.data.Tr_logistic_detail[index].Tr_detail_logistic_satuan_barang,
                                                item_history: [
                                                    {
                                                        "item_history_tanggal_datang": new Date().toISOString().slice(0, 10),
                                                        "item_history_no_transaksi": this.detaildata.Tr_kode_transaksi,
                                                        "item_history_pic_transaksi": this.detaildata.Tr_logistic_pic,
                                                        "item_history_supplier": this.detaildata.Tr_logistic_supplier,
                                                    }
                                                ]
                                            }
                                            Axios.post(allSource.createDataItem, newData)
                                            console.log(newData)
                                        } else {
                                            let updateData = {
                                                item_stok: parseFloat(hasil.data.item_stok) + parseFloat(response.data.Tr_logistic_detail[index].Tr_detail_logistic_jumlah_barang),
                                                item_history:
                                                {
                                                    "item_history_tanggal_datang": new Date().toISOString().slice(0, 10),
                                                    "item_history_no_transaksi": this.detaildata.Tr_kode_transaksi,
                                                    "item_history_pic_transaksi": this.detaildata.Tr_logistic_pic,
                                                    "item_history_supplier": this.detaildata.Tr_logistic_supplier,

                                                }
                                            }
                                            Axios.put(allSource.updateDataHistoryItemByName + response.data.Tr_logistic_detail[index].Tr_detail_logistic_nama_barang, updateData)
                                        }
                                    });
                            }
                        } else {
                            console.log("Belum Tiba")
                        }
                    }).catch((error) => {
                        this.$swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Ada data yang salah",
                        })
                    })
            })

        }
    },
    created() {
        this.getdata()
    },
    computed: {
        // Pagination with computed 
        indexStart() {
            return (this.current - 1) * this.pageSize;
        },
        indexEnd() {
            return this.indexStart + this.pageSize;
        },
        paginated() {
            return this.list_item.slice(this.indexStart, this.indexEnd);
        },
        // ----
        FilterPost: function () {
            return this.paginated.filter((item) => {
                var search_nama = item.Tr_logistic_pic.toLowerCase().includes(this.cari.toLowerCase());

                return search_nama;
            });
        },
    }
}
