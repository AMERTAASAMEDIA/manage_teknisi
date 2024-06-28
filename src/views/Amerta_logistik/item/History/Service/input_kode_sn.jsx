import Axios from "axios"
import allSource from "../../../../../all.source"
import router from "../../../../../router"
export default {
    data() {
        return {
            isVisible: true,
            data_item: "History Pembelian",
            data_item2: "List Transaksi Pembelian ",
            detail_data: {},
            data_array: [],
            items: [],
            item_nama: []
        }
    },
    methods: {
        // Format rupiah 
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        GetDetailData() {
            Axios.get(allSource.getDataItemById + this.$route.params.id)
                .then((response) => {
                    this.detail_data = response.data;
                }).catch(error => {
                    console.log(error)
                })
        },
        generateForm() {
            this.data_array = parseFloat(this.detail_data.item_stok) - this.detail_data.item_list.length
            this.isVisible = !this.isVisible
        },
        CreateForm() {
            this.$swal.fire({
                title: "Simpan perubahan?",
                text: "Apakah anda yakin menyimpan perubahan ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Konfirmasi"
            }).then((result) => {
                for (let i = 0; i < this.item_nama.length; i++) {
                    // const element = array[i];
                    let newdata = {
                        item_list_nama: this.detail_data.item_nama,
                        item_list_domain: this.$store.getters.Auth_domain,
                        item_list_kode_sn: this.item_nama[i],
                        item_list_harga: this.detail_data.item_harga,
                        item_list_created: new Date().toISOString().slice(0, 10),
                        item_list_updated: new Date().toISOString().slice(0, 10),
                        item_list_user_updated: "ADMIN-PASURUAN",
                        item_list_status: "Y",
                        item_list_status_pemakaian: "N",
                    }
                    const jumlah = i + 1;
                    const total_stok = JSON.stringify(parseInt(this.detail_data.item_stok) - jumlah);
                    Axios.put(allSource.updateDataItemListByid + this.detail_data._id, {
                        item_stok: this.detail_data.item_stok,
                        item_list: newdata
                    })
                    Axios.post(allSource.createDataListItem, newdata)
                    .then((response) =>{
                        this.$router.go(-1)
                    })
                    // console.log()
                    // console.log(newdata)
                    // console.log(this.detail_data._id)


                }
                this.$swal.fire({
                    title: "Berhasil!",
                    text: "Perubahan Telah tersimpan",
                    icon: "success"
                });
            })
        },
    },
    // computed:{
    //     list_untuk_kode_sn:function(){
    //         // return parseFloat(this.detail_data.item_stok)
    //         for (let index = 0; index < parseFloat(this.detail_data.item_stok); index++) {
    //             const element = array[index];
    //             let newdata = $push
    //             return this.data_array

    //         }
    //     }
    // },
    created() {
        this.GetDetailData()
        // this.data_array = parseFloat(this.jumlah);

    }
}
