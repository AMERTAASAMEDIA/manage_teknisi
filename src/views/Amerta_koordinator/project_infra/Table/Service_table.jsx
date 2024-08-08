import Axios from "axios"
import allSourceKoordinator from "../../../../all.source_koordinator";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Ticket Project Infra",
            detail_item: "DATA TICKET PROJECT INFRA YANG SEDANG DITANGANI (ON PROGRESS)",
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
        hapusdataticket(id) {
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
                    Axios.put(allSourceKoordinator.updateDataTicket + id, {
                        Tr_task_status: "N"
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
                Tr_task_nama : this.data.Tr_task_nama,
                Tr_task_no_telepon : this.data.Tr_task_no_telepon,
                Tr_task_alamat : this.data.Tr_task_alamat,
                Tr_task_priority: this.data.Tr_task_priority,
                Tr_task_kategori: "infra",
                Tr_task_created: new Date().toISOString().slice(0, 10),
                Tr_task_updated: new Date().toISOString().slice(0, 10),
                Tr_task_detail: this.data.Tr_task_detail,
                Tr_task_pic: this.data.Tr_task_pic,
                Tr_task_pegawai_list_penanganan : this.data.Tr_task_pegawai_list_penanganan
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
            Axios.get(allSourceKoordinator.getDataTicket + this.$store.getters.Auth_domain + "/P").then((response) => {
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
            return this.paginated
                .filter((item) => {
                    // Cek apakah kategori adalah 'infra'
                    var isInfraCategory = item.Tr_task_kategori.toLowerCase() === 'infra';
                   
        
                    // Cek apakah kode mencocokkan pencarian
                    var search_kode = item.Tr_task_kode.toLowerCase().includes(this.cari.toLowerCase());
        
                    // Hanya tampilkan jika kategori adalah 'infra' dan kode cocok dengan pencarian
                    return isInfraCategory && search_kode;
                });
        }        
    }
}
