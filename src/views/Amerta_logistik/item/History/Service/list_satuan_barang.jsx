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
      // with Table vue-v3
      // ----
      data_item: 'Data Item Satuan',
      exampleItems,
      list_item: [],
      cari: '',
      PageofItems: [],
      current: 1,
      pageSize: 10,
      search_body: '',
    }
  },
  methods: {
    reinput(items) {
      // console.log(items)
      // Axios.get(allSource.getDataTransaksiReinput + this.$store.getters.Auth_domain)
      this.$swal
        .fire({
          title: 'Simpan perubahan?',
          text: 'Apakah anda yakin ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Konfirmasi',
        })
        .then((result) => {
          if (result.isDismissed) {
            this.$swal.fire({
              title: 'Dibatalkan',
              text: 'Anda telah membatalkan aksi',
              icon: 'success',
            })
          } else {
            const today = new Date();
            const tahun = today.getFullYear();
            const bulan = today.getMonth() + 1;
            const tanggal = today.getDate();
            const NoTransaksaiGenerate = items.item_list_nama + "-" + tahun + bulan + tanggal;
            let newlaporanreinput = {
              Tr_reinput_pic: this.$store.getters.Auth_username,
              Tr_reinput_supplier:this.$store.getters.Auth_username,
              Tr_reinput_status:"Y",
              Tr_reinput_nama_barang: items.item_list_nama,
              Tr_reinput_jumlah:"1",
              Tr_reinput_keterangan:`DIKEMBALIKAN DIREINPUT OLEH ${this.$store.getters.Auth_username}`,
              Tr_reinput_tindak_lanjut:"KOSONG",
              Tr_reinput_domain: this.$store.getters.Auth_domain,
              Tr_reinput_created: new Date().toISOString().slice(0, 10),
              Tr_reinput_user_updated: this.$store.getters.Auth_username,
              Tr_reinput_no_transaksi: NoTransaksaiGenerate
            }
            Axios.post(allSource.createDataTransaksiReinput, newlaporanreinput)
            Axios.put(allSource.updateDataListItemById + items._id, { item_list_status_pemakaian: 'N' })
              .then((response) => {
                // this.$router.go(-1)
                this.getdata()
                this.$swal.fire({
                  title: 'Berhasil!',
                  text: 'Perubahan Telah tersimpan',
                  icon: 'success',
                })
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Ada data yang salah',
                })
              })
          }
        })
    },
    formatCurrency(amount) {
      return amount.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      })
    },
    getdata() {
      // let randomdata = [];
      Axios.get(allSource.getDataListItemByName + this.$route.params.name).then((response) => {
        this.list_item = response.data
        console.log(response.data)
      })
      // return randomdata;
    },
    // ----
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
    // Pagination with computed
    indexStart() {
      return (this.current - 1) * this.pageSize
    },
    indexEnd() {
      return this.indexStart + this.pageSize
    },
    paginatedd() {
      return this.list_item.slice(this.indexStart, this.indexEnd)
    },
    // ----
    FilterPost: function () {
      return this.paginatedd.filter((item) => {
        var search_nama = item.item_list_nama.toLowerCase().includes(this.cari.toLowerCase())

        return search_nama
      })
    },
    FilterCountPage: function () {
      return this.list_item.length / 10
    },
  },
}
