import Axios from 'axios'
import JwPagination from 'jw-vue-pagination'
import Table from 'data-table-vue-v3'
const exampleItems = [...Array(150).keys()].map((i) => ({ id: i + 1, name: 'Item ' + (i + 1) }))
import allSource from '../../../../../all.source'
export default {
  components: {
    JwPagination,
    Table,
  },
  data() {
    return {
      VisibleLihatGambar: false,
      VisibleUpdateImage: false,
      data_item: 'Data Item',
      exampleItems,
      list_item: [],
      cari: '',
      PageofItems: [],
      current: 1,
      pageSize: 10,
      search_body: '',
      detail_item: {},
      lihat_item: {},
    }
  },
  methods: {
    // Saat open modal lihat gambar
    lihatgambar(items) {
      this.VisibleLihatGambar = true
      this.lihat_item = items
    },
    formatCurrency(amount) {
      return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      })
    },
    getdata() {
      Axios.get(allSource.getDataItem).then((response) => {
        this.list_item = response.data
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
      this.current--
    },
    next() {
      this.current++
    },
  },
  created() {
    this.getdata()
  },
  computed: {
    // Imageurl bro
    TotalAll: function () {
      var hitungtotal = 0
      for (let i = 0; i < this.FilterPost.length; i++) {
        // const element = array[i]
        hitungtotal += parseInt(this.FilterPost[i].item_stok * this.FilterPost[i].item_harga)
      }
      return hitungtotal
    },
    imageUrl() {
      return '/images/' + this.lihat_item.item_gambar
    },
    // Pagination with computed
    indexStart() {
      return (this.current - 1) * this.pageSize
    },
    indexEnd() {
      return this.indexStart + this.pageSize
    },
    paginated() {
      return this.list_item.slice(this.indexStart, this.indexEnd)
    },
    // ----
    FilterPost: function () {
      return this.paginated.filter((item) => {
        return item.item_nama.toLowerCase().includes(this.cari.toLowerCase())
      })
    },
    FilterCountPage: function () {
      return this.list_item.length / 10
    },
  },
}
