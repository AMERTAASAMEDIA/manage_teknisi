import Axios from "axios"
import allSource from "../../../../all.source";
import allSourceKoordinator from "../../../../all.source_koordinator";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Ticket",
            detail_item: "DATA TICKET YANG HARUS DITANGANI",
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
        // Temp hapus data 
        hapusdatasupplier(id) {
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
                    Axios.put(allSource.updateDataSupplier + id, {
                        master_supplier_status: "N"
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
        detaildatasupplier(items) {
            this.Visibledetaildata = true
            this.detaildata = items
        },
        // CREATE DATA 
        createData() {
            let newdata = {
                Tr_task_kode: this.data.Tr_task_kode,
                Tr_task_status: "Y",
                Tr_task_domain: this.$store.getters.Auth_domain,
                Tr_task_priority: this.data.Tr_task_priority,
                Tr_task_kategori: this.data.Tr_task_kategori,
                Tr_task_created: new Date().toISOString().slice(0, 10),
                Tr_task_updated: new Date().toISOString().slice(0, 10),
                Tr_task_detail: this.data.Tr_task_detail,
                Tr_task_pic: this.data.Tr_task_pic,
                // Tr_task_pegawai_list_penangan : this.data.Tr_task_pegawai_list_penangan
            }
            // Clear after modal box closed 
            Axios.post(allSourceKoordinator.createDataTicket, newdata).then(() => {
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
            Axios.get(allSourceKoordinator.getDataTicket + this.$store.getters.Auth_domain).then((response) => {
                this.list_item = response.data;
                // console.log(response.data)
                // alert(response.data)
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
                var search_nama = item.master_supplier_nama.toLowerCase().includes(this.cari.toLowerCase());
                var search_toko = item.master_supplier_toko.toLowerCase().includes(this.cari.toLowerCase());

                return search_nama || search_toko;
            });
        }
    }
}
