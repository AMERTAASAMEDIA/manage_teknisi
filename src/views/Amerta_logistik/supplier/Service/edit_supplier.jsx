import Axios from "axios"
import allSource from "../../../../all.source"
import router from "../../../../router"
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
            Axios.get(allSource.getDataByIdSupplier + this.$route.params.id)
                .then((response) => {
                    this.detaildata = response.data
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
                Axios.put(allSource.updateDataSupplier + this.$route.params.id, this.detaildata)
                    .then((response) => {
                        this.getDetailData()
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
