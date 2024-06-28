import Axios from "axios"
import JwPagination from 'jw-vue-pagination';
import Table from 'data-table-vue-v3';
const exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
import allSource from "../../../../all.source"
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
            files: null,
            lihat_item:{}
        }
    },
    methods: {
        // Saat open modal lihat gambar 
        lihatgambar(items){
            this.VisibleLihatGambar = true
            this.lihat_item =  items
        },
        // Saat open modal updategambar 
        updategambar(items) {
            this.VisibleUpdateImage = true,
                this.detail_item = items
        },
        handleFileChange(event) {
            this.files = event.target.files;
        },
        async UploadGambar() {
            const formData = new FormData();
            // dengan multiple gambar 
            if (!this.files || this.files.length === 0) {
                // console.log('No files selected');
                this.$swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "File masih belum diisi",
                })
            } else {
                for (let i = 0; i < this.files.length; i++) {
                    formData.append('item_gambar', this.files[i])
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
                    Axios.put(allSource.updateDataItemGambar + this.detail_item._id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then((response) => {
                            // this.getDetailData()
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
        // ----
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        getdata() {
            Axios.get(allSource.getDataItemBySatuanPCS + this.$store.getters.Auth_domain + "/PCS").then((response) => {
                this.list_item = response.data;
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
        imageUrl(){
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
                var search_nama = item.item_nama.toLowerCase().includes(this.cari.toLowerCase());


                return search_nama;
            });
        },
        FilterCountPage: function () {
            return this.list_item.length / 10
        }
    }
}
