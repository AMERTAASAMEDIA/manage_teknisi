import Axios from "axios";
import Multiselect from 'vue-multiselect'
import allSourceKoordinator from "../../../../../all.source_koordinator";

export default {
    components: {
      Multiselect
    },
    data() {
      return {
        Visibletambahdata: false,
        data_item: "Data Tiket",
        list_item: [],
        cari: '',
        current: 1,
        pageSize: 10,
        detaildata: {},
        pegawaiList: [], // Untuk menyimpan daftar pegawai dari API
        selectedPegawai: [] // Untuk menyimpan pegawai yang dipilih
      }
    },
    methods: {
        kembali() {
            this.$router.go(-1);
        },
        getDetailData() {
            Axios.get(allSourceKoordinator.getDetailTicket + this.$route.params.id)
                .then((response) => {
                    this.detaildata = response.data;
                    console.log(response.data);
                });
        },
        UpdateDetailData() {
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.put(allSourceKoordinator.updateDataTicket + this.$route.params.id, this.detaildata)
                        .then((response) => {
                            this.$swal.fire({
                                title: "Berhasil!",
                                text: "Perubahan Telah tersimpan",
                                icon: "success"
                            });
                            this.getDetailData();
                            this.$router.push('/ticketing');
                        }).catch((error) => {
                            this.$swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ada data yang salah",
                            });
                        });
                }
            });
        },
        PengerjaanDetailData() {
            this.detaildata.Tr_task_status = "P"; // Mengubah status menjadi "P"
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                if (result.isConfirmed) {
                    Axios.put(allSourceKoordinator.updateDataTicket + this.$route.params.id, this.detaildata)
                        .then((response) => {
                            this.$swal.fire({
                                title: "Berhasil!",
                                text: "Perubahan Telah tersimpan",
                                icon: "success"
                            });
                            this.getDetailData();
                            this.$router.push('/ticketing');
                        }).catch((error) => {
                            this.$swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Ada data yang salah",
                            });
                        });
                }
            });
        }
    },
    getPegawaiList() {
        Axios.get('getDataTeknisi')
          .then((response) => {
            this.pegawaiList = response.data;
          })
          .catch((error) => {
            console.error("Error fetching pegawai list:", error);
          });
      },
    created() {
        this.getDetailData();
        this.getPegawaiList();
    }
};
