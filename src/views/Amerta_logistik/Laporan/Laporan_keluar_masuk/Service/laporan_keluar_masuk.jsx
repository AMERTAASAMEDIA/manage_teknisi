import Axios from 'axios'
import allSource from '../../../../../all.source'
export default {
  data() {
    return {
      VisibleTable: false,
      Visibledetaildata: false,
      data_item: 'Laporan Masuk Barang',
      list_item: [],
      cari: '',
      current: 1,
      pageSize: 10,
      // CREATE DATA
      data: {},
      detaildata: {},
      newdata: [],
    }
  },
  methods: {
    formatCurrency(amount) {
      return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      })
    },
    // LIST DATA
    getdata() {
      if (!this.cari) {
        this.$swal.fire({
          title: 'Gagal',
          text: 'Tolong isi tanggal terlebih dahulu',
          icon: 'error',
        })
      } else {
        Axios.post(allSource.getDataTransaksiLogistikMasukFilterTanggal + this.cari).then(
          (response) => {
            this.list_item = response.data
            this.VisibleTable = true
            // console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
              // const element = array[i];
              Axios.get(
                allSource.getDataItemByName + response.data[i].Tr_detail_logistic_nama_barang,
              ).then((newresponse) => {
                // console.log(newresponse.data)
                this.newdata = newresponse.data
              })
            }
          },
        )
      }
    },
    // Pagination with computed
    prev() {
      this.current--
    },
    next() {
      this.current++
    },
  },
  computed: {
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
        return item.item_created.toLowerCase().includes(this.cari.toLowerCase())
      })
    },
  },
}
