import Axios from "axios"
import allSource_koordinator from "../../../../../all.source_koordinator"
export default {
    data() {
        return {
            Visibletambahdata: false,
            data_item: "Data Supplier",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            detaildata: {}
        }
    },
    methods: {
        kembali() {
            this.$router.go(-1)
        },
        getDetailData() {
            Axios.get(allSource_koordinator.getDetailTicket + this.$route.params.id)
                .then((response) => {
                    this.detaildata = response.data
                    console.log(response.data)
                })
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

        }
    },
    created() {
        this.getDetailData()
    }
}
