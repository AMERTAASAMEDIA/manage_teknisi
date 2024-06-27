import Axios from "axios"
import allSource from "../../../../all.source";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data Supplier",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            // CREATE DATA 
            data: {},
            detaildata: {}
        }
    },
    methods: {
        // DETAIL DATA 
        detailData(items) {
            this.Visibledetaildata = true
            this.detaildata = items
        },
        // LIST DATA 
        getdata() {
            Axios.get(allSource.getDataTransaksiQC).then((response) => {
                this.list_item = response.data;
                console.log(response.data)
            })
        },
        // Pagination with computed 
        prev() {
            this.current--;
        },
        next() {
            this.current++;
        }
    },
    created() {
        this.getdata()
    },
    computed: {
        ImageUrlBefore(){
            return "/images/" + this.detaildata.Tr_qc_before
        },
        ImageUrlAfter(){
            return "/images/" + this.detaildata.Tr_qc_after
        },
        // Pagination with computed 
        indexStart() {
            return (this.current - 1) * this.pageSize;
        },
        indexEnd() {
            return this.indexStart + this.pageSize;
        },
        paginated() {
            return this.list_item.slice(this.indexStart, this.indexEnd);
        },
        // ----
        FilterPost: function () {
            return this.paginated.filter((item) => {
                var search_nama = item.Tr_qc_pic.toLowerCase().includes(this.cari.toLowerCase());
                var search_toko = item.Tr_qc_nama_barang.toLowerCase().includes(this.cari.toLowerCase());

                return search_nama || search_toko;
            });
        }
    }
}
