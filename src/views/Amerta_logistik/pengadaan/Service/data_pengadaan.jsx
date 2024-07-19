import Axios from "axios"
import allSource from "../../../../all.source";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Pengadaan",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            // CREATE DATA 
            data: {},
            detaildata: {}
        }
    },
    methods: {
        // format untuk idr
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        // Temp hapus data 
        hapusdata(id) {
            // alert(id)
            this.$swal.fire({
                title: "Apakah anda yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya"
            }).then((result) => {
                if (result.isDismissed) {
                    this.$swal.fire({
                        title: "Dibatalkan",
                        text: "Anda telah membatalkan aksi",
                        icon: "success"
                    })
                } else {
                    Axios.put(allSource.updateDataPengadaanBarang + id, {
                        master_pengadaan_barang_status: "N"
                    }).then((response) => {
                        if (response.status = 200) {
                            this.$swal.fire({
                                title: "Berhasil!",
                                text: "Data telah dihapus.",
                                icon: "success"
                            });
                        } else {
                            this.$swal.fire({
                                title: "Gagal!",
                                text: "Data gagal dihapus.",
                                icon: "danger"
                            });
                        }
                        this.getdata()
                    })
                }
            });
        },
        // DETAIL DATA 
        updatedata(items) {
            this.Visibledetaildata = true
            this.detaildata = items
        },
        // update pengadaan 
        updatePengadaan(){
            this.$swal.fire({
                title: "Apakah anda yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya"
            }).then((result) => {
                if (result.isDismissed) {
                    this.$swal.fire({
                        title: "Dibatalkan",
                        text: "Anda telah membatalkan aksi",
                        icon: "success"
                    })
                } else {
                    Axios.put(allSource.updateDataPengadaanBarang + this.detaildata._id, this.detaildata)
                    .then((response) => {
                        if (response.status = 200) {
                            console.log(response.data)
                            // this.$swal.fire({
                            //     title: "Berhasil!",
                            //     text: "Data telah diupdate.",
                            //     icon: "success"
                            // });
                        } else {
                            this.$swal.fire({
                                title: "Gagal!",
                                text: "Data gagal diupdate.",
                                icon: "danger"
                            });
                        }
                        this.getdata()
                    })
                }
            });
        },
        // CREATE DATA 
        createData() {
            let newdata = {
                master_pengadaan_barang_nama: this.data.master_pengadaan_barang_nama,
                master_pengadaan_barang_pic: this.data.master_pengadaan_barang_pic,
                master_pengadaan_barang_kategori: this.data.master_pengadaan_barang_kategori,
                master_pengadaan_barang_domain: this.$store.getters.Auth_domain,
                master_pengadaan_barang_created: new Date().toISOString().slice(0, 10),
                master_pengadaan_barang_updated: new Date().toISOString().slice(0, 10),
                master_pengadaan_barang_user_updated: "ADMIN-PASURUAN",
                master_pengadaan_barang_status: "Y",
                master_pengadaan_barang_harga: this.data.master_pengadaan_barang_harga,
                master_pengadaan_barang_realisasi_kebutuhan: this.data.master_pengadaan_barang_realisasi_kebutuhan,
                master_pengadaan_barang_realisasi_sudah: this.data.master_pengadaan_barang_realisasi_sudah,
                master_pengadaan_no_kuitansi: this.data.master_pengadaan_no_kuitansi
            }
            // Clear after modal box closed 
            Axios.post(allSource.createDataPengadaanBarang, newdata).then(() => {
                this.$swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Data Berhasil Tersimpan",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.Visibletambahdata = false;
                this.data = {}
                this.getdata()
            }).catch((error) => {
                console.log(error)
            })
        },
        // LIST DATA 
        getdata() {
            Axios.get(allSource.getDataPengadaanBarang + this.$store.getters.Auth_domain).then((response) => {
                this.list_item = response.data;
                // console.log(response.data)
            })
        },
        // Pagination with computed 
        prev() {
            this.current--;
        },
        next() {
            this.current++;
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
                var search_nama = item.master_pengadaan_barang_nama.toLowerCase().includes(this.cari.toLowerCase());
                // Comingsoon for search option 
                // var search_toko = item.master_supplier_toko.toLowerCase().includes(this.cari.toLowerCase());

                return search_nama;
            });
        }
    }
}
