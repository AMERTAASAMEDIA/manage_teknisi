import axios from 'axios'
import Axios from 'axios'
import allSource from '../../../../all.source'
import router from '../../../../router'
export default {
  data() {
    return {
      data_item: 'Form Alokasi Barang',
      data_item2: 'List Peminta(Pegawai)',
      formArray: [{}],
      tambah_data: {},
      detail_data: {},
      no_transaksi: '',
      form_khusus_tanggal: '',
    }
  },
  methods: {
    addItem() {
      this.formArray.push({
        Tr_logistic_keluar_list_pegawai: '',
      })
    },
    removeItem(index) {
      this.formArray.splice(index, 1)
    },
    kembali() {
      this.$router.go(-1)
    },
    getdatatransaksi() {
      Axios.get(allSource.getDataTransaksiLogistikKeluar).then((response) => {
        // console.log(response.data.length + 1)
        this.no_transaksi = response.data.length + 1
      })
    },
    async getdetail() {
      Axios.get(allSource.getDataListItemById + this.$route.params.id).then((response) => {
        this.detail_data = response.data
        // console.log(response.data);
      })
    },
    async CreateData() {
      // console.log(this.form_khusus_tanggal)
      if (
        !this.tambah_data.Tr_logistic_keluar_tanggal ||
        this.tambah_data.Tr_logistic_keluar_tanggal === ''
      ) {
        // console.log("Haha")
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tanggal Belom diinput',
        })
      } else {
        let update_data = {
          item_list_status_pemakaian: 'Y',
          item_list_history: {
            item_list_history_no_transaksi: this.NoTransaksiFix,
            item_list_history_tanggal: new Date(this.tambah_data.Tr_logistic_keluar_tanggal)
              .toISOString()
              .slice(0, 10),
            item_list_history_kategori: this.tambah_data.Tr_logistic_keluar_kategori,
            item_list_history_keperluan: this.tambah_data.Tr_logistic_keluar_keperluan,
          },
        }
        let newdata = {
          Tr_logistic_keluar_nama_item: this.detail_data.item_list_nama,
          Tr_logistic_keluar_keperluan_nama_pelanggan:
            this.tambah_data.Tr_logistic_keluar_keperluan,
          Tr_logistic_keluar_tanggal: new Date(this.tambah_data.Tr_logistic_keluar_tanggal)
            .toISOString()
            .slice(0, 10),
          Tr_logistic_keluar_alamat: this.tambah_data.Tr_logistic_keluar_alamat,
          Tr_logistic_keluar_kategori: this.tambah_data.Tr_logistic_keluar_kategori,
          Tr_logistic_keluar_kode_transaksi: this.NoTransaksiFix,
          Tr_logistic_keluar_created: new Date().toISOString().slice(0, 10),
          Tr_logistic_keluar_total: '1',
          Tr_logistic_keluar_user_created: 'ADMIN-PASURUAN',
          Tr_logistic_keluar_status: 'Y',
          Tr_logistic_keluar_type: 'PCS',
          Tr_logistic_keluar_domain: 'AMERTA-PASURUAN',
          Tr_logistic_keluar_detail: {
            Tr_logistic_keluar_detail_no_husble: '',
            Tr_logistic_keluar_detail_tanggal: new Date(this.tambah_data.Tr_logistic_keluar_tanggal)
              .toISOString()
              .slice(0, 10),
            Tr_logistic_keluar_detail_sn_ont: '-',
            Tr_logistic_keluar_detail_type_ont: '-',
          },
          Tr_logistic_keluar_pegawai_list: this.formArray,
          
        }
        this.$swal
          .fire({
            title: 'Simpan perubahan?',
            text: 'Apakah anda yakin Ingin menambah data ?',
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
              Axios.put(
                allSource.updateDataListItemHistoryById + this.$route.params.id,
                update_data,
              )
              Axios.post(allSource.createDataTransaksiLogistikKeluar, newdata)
                .then((response) => {
                  this.$router.go(-1)
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
      }
    },
  },
  created() {
    this.getdetail()
    this.getdatatransaksi()
  },
  computed: {
    NoTransaksiFix: function () {
      var a =
        this.tambah_data.Tr_logistic_keluar_kategori +
        '/' +
        this.no_transaksi +
        '/' +
        new Date().toISOString().slice(0, 10)
      return a
    },
  },
}
