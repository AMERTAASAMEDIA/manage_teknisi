import Axios from "axios"
import JwPagination from 'jw-vue-pagination';
import Table from 'data-table-vue-v3';
const exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
// import allSource from "../../../../../all.source"
import allSource from '../../../../../all.source.jsx'
export default {

    components: {
        JwPagination,
        Table
    },
    data() {
        return {
            VisibleLihatGambar: false,
            VisibleUpdateImage: false,
            data_item: "Data Item",
            exampleItems,
            list_item: [],
            cari: '',
            PageofItems: [],
            current: 1,
            pageSize: 10,
            search_body: "",
            detail_item: {},
            lihat_item: {}
        }
    },
    methods: {
        // Saat open modal lihat gambar 
        lihatgambar(items) {
            this.VisibleLihatGambar = true
            this.lihat_item = items
        },
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        getdata() {
            Axios.get(allSource.getDataTransaksiReinput + this.$store.getters.Auth_domain).then((response) => {
                this.list_item = response.data;
                console.log(response.data)
                // console.log(response.data)
            })
        },
        onChangePage: function (PageofItems) {
            this.PageofItems = PageofItems
            // console.log(pageSize)
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
        // Imageurl bro 
        imageUrl() {
            return '/images/' + this.lihat_item.item_gambar
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
                var search_nama = item.Tr_reinput_created.toLowerCase().includes(this.cari.toLowerCase());


                return search_nama;
            });
        },
        FilterCountPage: function () {
            return this.list_item.length / 10
        }
    }
}
