import Axios from "axios"
import allSource from "../../../../all.source"
import router from "../../../../router"
export default {
    data() {
        return {
            Visibletambahdata: false,
            data_item: "Form tambah data material & supplier penyedia",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            tambahdata: {},
            formArray: [{}],
            newcalculate: ""
        }
    },
    methods: {
        // Hitung rata rata 
        calculatethisAverage() {
            // for (let index = 0; index < this.formArray.master_harga_material_supplier_list_harga.length; index++) {
            //     // const element = array[index];
            //     if (this.formArray[index].master_harga_material_supplier_list_harga.length === 0) return 0;
            //     const sum = this.formArray[index].master_harga_material_supplier_list_harga.reduce((acc, num) => acc + num, 0)
            //     return sum / this.formArray[index].master_harga_material_supplier_list_harga.length
            // }
            // let newcalculate = 0;
            let newcal = 0;
            for (let index = 0; index < this.formArray; index++) {
                // const element = array[index];
                newcal = this.formArray[index]
                // console.log(this.formArray[index])
            }
            return newcal
            console.log(newcal)
            // console.log(this.newcalculate)
        },
        // Tambah supplier dengan form array 
        addItem() {
            this.formArray.push({
                master_harga_material_supplier_list_nama_supplier: '',
                master_harga_material_supplier_list_harga: '',
                master_harga_material_supplier_list_keterangan: ''
            })
        },
        removeItem(index) {
            this.formArray.splice(index, 1)
        },
        submitForm() {
            let newdata = {
                "master_harga_material_nama": this.tambahdata.nama_barang,
                "master_harga_material_domain": this.$store.getters.Auth_domain,
                "master_harga_material_created": new Date().toISOString().slice(0, 10),
                "master_harga_material_updated": new Date().toISOString().slice(0, 10),
                "master_harga_material_user_updated": "ADMIN-PASURUAN",
                "master_harga_material_status": "Y",
                "master_harga_material_supplier_list": this.formArray
            }
            console.log(newdata)
        },
        kembali() {
            this.$router.go(-1)
        },
        CreateData() {
            // console.log(this.detaildata)
            let newdata = {
                "master_harga_material_nama": this.tambahdata.nama_barang,
                "master_harga_material_domain": this.$store.getters.Auth_domain,
                "master_harga_material_created": new Date().toISOString().slice(0, 10),
                "master_harga_material_updated": new Date().toISOString().slice(0, 10),
                "master_harga_material_user_updated": "ADMIN-PASURUAN",
                "master_harga_material_status": "Y",
                "master_harga_material_supplier_list": this.formArray

            }
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin Ingin menambah data ?",
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
                Axios.post(allSource.createDataHargaMaterial, newdata)
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
    // computed: {
    //     calculatethisAverage() {
    //         // for (let index = 0; index < this.formArray.master_harga_material_supplier_list_harga.length; index++) {
    //         //     // const element = array[index];
    //         //     if (this.formArray[index].master_harga_material_supplier_list_harga.length === 0) return 0;
    //         //     const sum = this.formArray[index].master_harga_material_supplier_list_harga.reduce((acc, num) => acc + num, 0)
    //         //     return sum / this.formArray[index].master_harga_material_supplier_list_harga.length
    //         // }
    //         let hitungtotal = "";
    //         for (let index = 0; index < this.formArray.length; index++) {
    //             // const element = array[index];
    //             hitungtotal += this.formArray[index].master_harga_material_supplier_list_harga
    //             return hitungtotal
    //         }
    //     }
    // }
}
