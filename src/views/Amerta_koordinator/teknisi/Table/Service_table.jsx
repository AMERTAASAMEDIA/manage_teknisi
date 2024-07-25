import Axios from "axios"
import allSource from "../../../../all.source";
import allSourceKoordinator from "../../../../all.source_koordinator";
import allSource_koordinator from "../../../../all.source_koordinator";
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
                    Axios.put(allSource_koordinator.updateDataTeknisi + id, {
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
                master_pengguna_nama: this.data.master_pengguna_nama,
                master_pengguna_id: this.data.master_pengguna_id,
                master_pengguna_domain: this.$store.getters.Auth_domain,
                master_pengguna_status: "Y",
                master_pengguna_alamat: this.data.master_pengguna_alamat,
                master_pengguna_role: this.data.master_pengguna_role,
                master_pengguna_no_telepon: this.data.master_pengguna_no_telepon,
                master_pengguna_ppoe: "0",
                master_pengguna_detail_identitas: {
                    master_pengguna_detail_identitas_ktp: this.data.master_pengguna_detail_identitas_ktp,
                    master_pengguna_detail_identitas_npwp: this.data.master_pengguna_detail_identitas_npwp,
                },
                master_pengguna_tanggal_pemasangan: "0",
                master_pengguna_created: new Date().toISOString().slice(0, 10),
                master_pengguna_updated: new Date().toISOString().slice(0, 10),
                master_pengguna_user_updated:"CS-1(ROMI)",
                master_pengguna_tipe_pelanggan: "HOME",
                master_pengguna_pic_psb: this.data.master_pengguna_pic_psb
            }
            // Clear after modal box closed 
            Axios.post(allSource_koordinator.createDataTeknisi, newdata).then(() => {
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
            Axios.get(allSourceKoordinator.getDataTeknisi + this.$store.getters.Auth_domain).then((response) => {
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
                var search_id = item.master_pengguna_id.toLowerCase().includes(this.cari.toLowerCase());
                // var search_toko = item.master_supplier_toko.toLowerCase().includes(this.cari.toLowerCase());

                return search_id;
            });
        }
    }
}
