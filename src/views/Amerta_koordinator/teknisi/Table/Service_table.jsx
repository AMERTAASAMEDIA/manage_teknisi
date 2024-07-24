import Axios from "axios";
import allSource from "../../../../all.source";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Teknisi",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            // CREATE DATA 
            data: {},
            detaildata: {}
        };
    },
    methods: {
        // Temp hapus data 
        hapusdatateknisi(id) {
            this.$swal.fire({
                title: "Apakah anda yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Hapus",
                cancelButtonText: "Batal",
                reverseButtons: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deletetechnician(id);
                }
            });
        },
        // Detail Data 
        detaildatateknisi(data) {
            this.Visibledetaildata = true;
            this.detaildata = { ...data };
        },
        // Create Data 
        async createData() {
            if (this.data.nama_teknisi === undefined || this.data.alamat_teknisi === undefined || this.data.spesialisasi === undefined || this.data.no_telepon_teknisi === undefined) {
                this.$swal.fire({
                    title: "Data tidak lengkap",
                    text: "Silakan lengkapi data teknisi",
                    icon: "error",
                    confirmButtonText: "Tutup",
                });
                return;
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            await Axios.post(allSource.teknisi.create, this.data, config).then((response) => {
                this.$swal.fire({
                    title: "Data berhasil ditambahkan",
                    text: "Data teknisi telah berhasil ditambahkan",
                    icon: "success",
                    confirmButtonText: "Tutup",
                });
                this.Visibletambahdata = false;
                this.fetchAll();
            }).catch((err) => {
                this.$swal.fire({
                    title: "Gagal menambahkan data",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Tutup",
                });
            });
        },
        // Fetch All Data 
        async fetchAll() {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            await Axios.get(allSource.teknisi.all, config).then((response) => {
                this.list_item = response.data;
            }).catch((err) => {
                this.$swal.fire({
                    title: "Gagal memuat data",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Tutup",
                });
            });
        },
        // Delete Data 
        async deletetechnician(id) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            };
            await Axios.delete(`${allSource.teknisi.delete}/${id}`, config).then((response) => {
                this.$swal.fire({
                    title: "Data berhasil dihapus",
                    text: "Data teknisi telah berhasil dihapus",
                    icon: "success",
                    confirmButtonText: "Tutup",
                });
                this.fetchAll();
            }).catch((err) => {
                this.$swal.fire({
                    title: "Gagal menghapus data",
                    text: err.response.data.message,
                    icon: "error",
                    confirmButtonText: "Tutup",
                });
            });
        },
        // Pagination
        prev() {
            if (this.current > 1) this.current--;
        },
        next() {
            if (this.current * this.pageSize < this.list_item.length) this.current++;
        }
    },
    computed: {
        FilterPost() {
            return this.list_item.filter(post => {
                return post.nama_teknisi.toLowerCase().includes(this.cari.toLowerCase());
            });
        }
    },
    mounted() {
        this.fetchAll();
    },
};
