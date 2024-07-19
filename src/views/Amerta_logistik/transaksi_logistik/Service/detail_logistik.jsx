import Axios from "axios"
import allSource from "../../../../all.source"
import router from "../../../../router"
export default {
    data() {
        return {
            data_item: "Detail Data Logistik",
            data_item2:"List Data Pembelian / Penjualan",
            detail_data: {},
        }
    },
    methods: { 
        // Format rupiah 
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        GetDetailData(){
            Axios.get(allSource.getDataTransaksiLogistikById + this.$route.params.id)
            .then((response) =>{
                console.log(response.data)
                this.detail_data = response.data;
            }).catch(error =>{
                console.log(error)
            })
        },
        kembali() {
            this.$router.go(-1)
        },
    },
    created(){
        this.GetDetailData()
    },
}
