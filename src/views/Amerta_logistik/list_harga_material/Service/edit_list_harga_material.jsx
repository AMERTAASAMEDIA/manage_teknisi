import Axios from "axios"
import allSource from "../../../../all.source"
import router from "../../../../router"
export default {
    data() {
        return {
            data_item: "Form Update data material & supplier penyedia",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            updatedata: {},
            formArray: [{}],
            newcalculate: ""
        }
    },
    methods: { 
        GetDetailData(){
            Axios.get(allSource.getDataHargaMaterialById + this.$route.params.id)
            .then((response) =>{
                // console.log(response.data)
                this.updatedata = response.data;
            }).catch(error =>{
                console.log(error)
            })
        },
        addItem() {
            this.updatedata.master_harga_material_supplier_list.push({
                master_harga_material_supplier_list_nama_supplier: '',
                master_harga_material_supplier_list_harga: '',
                master_harga_material_supplier_list_keterangan: ''
            })
        },
        removeItem(index) {
            this.updatedata.master_harga_material_supplier_list.splice(index, 1)
        },
        kembali() {
            this.$router.go(-1)
        },
        UpdateData() {
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin Ingin merubah data ?",
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
                Axios.put(allSource.updateDataHargaMaterial + this.$route.params.id, this.updatedata)
                    .then((response) => {
                        // this.getDetailData()
                        this.$router.go(-1)
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
    created(){
        this.GetDetailData()
    },
}
