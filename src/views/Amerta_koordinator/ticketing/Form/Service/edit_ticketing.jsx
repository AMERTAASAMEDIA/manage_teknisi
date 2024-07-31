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
    methods: {
        kembali() {
            this.$router.go(-1);
        },
        getDetailData() {
            Axios.get(allSource_koordinator.getDetailTicket + this.$route.params.id)
                .then((response) => {
                    this.detaildata = response.data;
                    this.detaildata.Tr_task_pegawai_list_penanganan = response.data.Tr_task_pegawai_list_penangan.map(nama => 
                        this.pegawaiOptions.find(pegawai => pegawai.master_pengguna_nama === nama)
                    );
                })
                .catch((error) => {
                    console.error("Error fetching detail data:", error);
                });
        },
        getPegawaiList() {
            Axios.get(allSource_koordinator.getDataTeknisi + this.$store.getters.Auth_domain)
                .then((response) => {
                    console.log("Pegawai Options:", response.data); // Log data untuk debugging
                    this.pegawaiOptions = response.data.map(pegawai => ({
                        master_pengguna_id: pegawai.master_pengguna_id,
                        master_pengguna_nama: pegawai.master_pengguna_nama
                    }));
                })
                .catch((error) => {
                    console.error("Error fetching pegawai list:", error);
                });
        },
        PengerjaanDetailData() {
            this.detaildata.Tr_task_status = "P"; // Mengubah status menjadi "P"
            Swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.put(allSource_koordinator.updateDataTicket + this.$route.params.id, this.detaildata)
                        .then(() => {
                            Swal.fire({
                                title: "Berhasil!",
                                text: "Perubahan Telah tersimpan",
                                icon: "success"
                            });
                            this.getDetailData();
                            this.$router.push('/ticketing');
                        })
                        .catch(() => {
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
