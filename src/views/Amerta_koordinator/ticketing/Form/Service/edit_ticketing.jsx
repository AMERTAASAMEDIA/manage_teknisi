import Axios from "axios";
import allSource_koordinator from "../../../../../all.source_koordinator";
import Multiselect from 'vue-multiselect';
import Swal from 'sweetalert2';

export default {
    components: { Multiselect },
    data() {
        return {
            Visibletambahdata: false,
            data_item: "Data Tiket",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            detaildata: {},
            pegawaiOptions: [],
            selectedPegawai: []
        };
    },
    computed: {
        filteredPegawaiOptions() {
            return this.pegawaiOptions.filter(option => 
                !this.selectedPegawai.some(selected => selected.master_pengguna_id === option.master_pengguna_id)
            );
        }
    },
    methods: {
        kembali() {
            this.$router.go(-1);
        },
        getDetailData() {
            Axios.get(allSource_koordinator.getDetailTicket + this.$route.params.id)
                .then((response) => {
                    console.log("Detail Data from server:", response.data);
                    this.detaildata = response.data;
                    // Pastikan Tr_task_pegawai_list_penanganan selalu berupa array
                    if (!Array.isArray(this.detaildata.Tr_task_pegawai_list_penanganan)) {
                        this.detaildata.Tr_task_pegawai_list_penanganan = [];
                    }
                    this.selectedPegawai = this.detaildata.Tr_task_pegawai_list_penanganan.map(nama => 
                        this.pegawaiOptions.find(pegawai => pegawai.master_pengguna_nama === nama)
                    );
                    console.log("Selected Pegawai after fetching detail data:", this.selectedPegawai);
                })
                .catch((error) => {
                    console.error("Error fetching detail data:", error);
                });
        },
        getPegawaiList() {
            Axios.get(allSource_koordinator.getDataTeknisi + this.$store.getters.Auth_domain)
                .then((response) => {
                    console.log("Pegawai Options:", response.data);
                    this.pegawaiOptions = response.data.map(pegawai => ({
                        master_pengguna_id: pegawai.master_pengguna_id,
                        master_pengguna_nama: pegawai.master_pengguna_nama
                    }));
                })
                .catch((error) => {
                    console.error("Error fetching pegawai list:", error);
                });
        },
        UpdateDetailData() {
            // console.log(this.detaildata)
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
                Axios.put(allSource_koordinator.updateDataTicket + this.$route.params.id, this.detaildata)
                    .then((response) => {
                        this.getDetailData()
                        this.$router.push('/ticketing')
                    }).catch((error) => {
                        this.$swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Ada data yang salah",
                        })
                    })
            })

        },
        PengerjaanDetailData() {
            this.detaildata.Tr_task_status = "P";
            Swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                if (result.isConfirmed) {
                    // Log data yang akan dikirim
                    console.log("Selected Pegawai:", this.selectedPegawai);
                    console.log("Detail Data:", this.detaildata);
                    
                    this.detaildata.Tr_task_pegawai_list_penanganan = this.selectedPegawai.map(pegawai => pegawai.master_pengguna_nama);
                    console.log("Detail Data after mapping:", this.detaildata);
                    
                    Axios.put(allSource_koordinator.updateDataTicket + this.$route.params.id, this.detaildata)
                        .then((response) => {
                            console.log("Response from server:", response.data);
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Perubahan Telah tersimpan",
                                icon: "success"
                            });
                            this.getDetailData();
                            this.$router.push('/ticketing');
                        })
                        .catch((error) => {
                            console.error("Error updating data:", error);
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ada data yang salah",
                            });
                        });
                }
            });
        }
    },
    created() {
        this.getPegawaiList();
        this.getDetailData();
    }
};