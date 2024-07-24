import Axios from "axios";
import allSource from "../../../../all.source";

export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Project Infra",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            // CREATE DATA 
            data: {
                nama_project: '',
                lokasi: '',
                deskripsi: '',
                status: ''
            },
            detaildata: {}
        };
    },
    methods: {
        // Temp hapus data 
        hapusdataproject(id) {
            this.$swal.fire({
                title: "Apakah Anda yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteProject(id);
                }
            });
        },

        // Detail Data 
        detaildataproject(data) {
            this.Visibledetaildata = true;
            this.detaildata = { ...data };
        },

        // Create Data 
        createData() {
            Axios.post(`${allSource.apiBaseUrl}/project-infra`, this.data)
                .then((response) => {
                    this.$swal.fire({
                        title: "Berhasil!",
                        text: "Data Project Infra berhasil ditambahkan.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.fetchData();
                    this.Visibletambahdata = false;
                })
                .catch((error) => {
                    this.$swal.fire({
                        title: "Gagal!",
                        text: "Gagal menambahkan data Project Infra.",
                        icon: "error",
                        timer: 1500,
                        showConfirmButton: false
                    });
                });
        },

        // Delete Data 
        deleteProject(id) {
            Axios.delete(`${allSource.apiBaseUrl}/project-infra/${id}`)
                .then((response) => {
                    this.$swal.fire({
                        title: "Berhasil!",
                        text: "Data Project Infra berhasil dihapus.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                    this.fetchData();
                })
                .catch((error) => {
                    this.$swal.fire({
                        title: "Gagal!",
                        text: "Gagal menghapus data Project Infra.",
                        icon: "error",
                        timer: 1500,
                        showConfirmButton: false
                    });
                });
        },

        // Fetch Data 
        fetchData() {
            Axios.get(`${allSource.apiBaseUrl}/project-infra`)
                .then((response) => {
                    this.list_item = response.data;
                })
                .catch((error) => {
                    console.error("Terjadi kesalahan saat mengambil data:", error);
                });
        },

        // Pagination
        prev() {
            if (this.current > 1) {
                this.current--;
                this.fetchData();
            }
        },

        next() {
            if (this.current * this.pageSize < this.list_item.length) {
                this.current++;
                this.fetchData();
            }
        }
    },
    computed: {
        FilterPost() {
            let start = (this.current - 1) * this.pageSize;
            let end = start + this.pageSize;
            return this.list_item.slice(start, end);
        }
    },
    created() {
        this.fetchData();
    }
};
