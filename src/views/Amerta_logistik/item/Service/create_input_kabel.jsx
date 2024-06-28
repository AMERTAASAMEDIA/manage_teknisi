import axios from 'axios'
import Axios from 'axios'
import allSource from '../../../../all.source'
import router from '../../../../router'
export default {
  data() {
    return {
      data_item: 'Form Input Pemakaian Kabel',
      data_item2: 'List Teknisi(Penarik)',
      formArray: [{}],
      tambah_data: {},
      NomorHusble: {},
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
        console.log(response.data.length + 1)
        this.no_transaksi = response.data.length + 1
      })
    },
    async getdetail() {
      Axios.get(allSource.getDataItemById + this.$route.params.id).then((response) => {
        this.NomorHusble = response.data
        console.log(response.data)
      })
    },
    async CreateData() {
      // console.log(this.form_khusus_tanggal)
      if (!this.form_khusus_tanggal || this.form_khusus_tanggal === '') {
        // console.log("Haha")
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Tanggal Belom diinput',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_keperluan) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Keperluan harus diisi',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_kategori_keperluan) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Kategori Keperluan harus diisi',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_sn) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'SN ONT harus diisi',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_type_ont) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'TYPE ONT harus diisi',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_total) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Panjang kabel harus diisi',
        })
      } else if (!this.tambah_data.Tr_logistic_keluar_alamat) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Alamat harus diisi',
        })
      } else {
        let update_data = {
          item_stok: this.HitungyangTerpakai,
          item_history_pemakaian_kabel: {
            item_history_pemakaian_kabel_no_transaksi: this.NomorTransaksi,
            item_history_pemakaian_kabel_total: this.tambah_data.Tr_logistic_keluar_total,
            item_history_pemakaian_kabel_tanggal: new Date(this.form_khusus_tanggal)
              .toISOString()
              .slice(0, 10),
          },
        }
        let newdata = {
          Tr_logistic_keluar_nama_item: this.NomorHusble.item_nama,
          Tr_logistic_keluar_keperluan_nama_pelanggan:
            this.tambah_data.Tr_logistic_keluar_keperluan,
          Tr_logistic_keluar_tanggal: new Date(this.form_khusus_tanggal).toISOString().slice(0, 10),
          Tr_logistic_keluar_alamat: this.tambah_data.Tr_logistic_keluar_alamat,
          Tr_logistic_keluar_kategori: this.tambah_data.Tr_logistic_keluar_kategori_keperluan,
          Tr_logistic_keluar_kode_transaksi: this.NomorTransaksi,
          Tr_logistic_keluar_created: new Date().toISOString().slice(0, 10),
          Tr_logistic_keluar_total: this.tambah_data.Tr_logistic_keluar_total,
          Tr_logistic_keluar_user_created: 'ADMIN-PASURUAN',
          Tr_logistic_keluar_type: 'METER',
          Tr_logistic_keluar_status: 'Y',
          Tr_logistic_keluar_domain: this.$store.getters.Auth_domain,
          Tr_logistic_keluar_detail: {
            Tr_logistic_keluar_detail_no_husble: this.NomorHusble.item_husble,
            Tr_logistic_keluar_detail_tanggal: new Date(this.form_khusus_tanggal)
              .toISOString()
              .slice(0, 10),
            Tr_logistic_keluar_detail_sn_ont: this.tambah_data.Tr_logistic_keluar_sn,
            Tr_logistic_keluar_detail_type_ont: this.tambah_data.Tr_logistic_keluar_type_ont,
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
              Axios.put(allSource.updateDataItemHistoryKabel + this.$route.params.id, update_data)
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
    NomorTransaksi: function () {
      var hasil = ''
      if (this.tambah_data.Tr_logistic_keluar_kategori_keperluan === 'Jalur') {
        hasil = 'JALUR'
      } else if (this.tambah_data.Tr_logistic_keluar_kategori_keperluan === 'PSB') {
        hasil = 'PSB'
      } else {
        hasil = 'MT'
      }

      return hasil + '/2024/05/' + this.no_transaksi
    },
    HitungyangTerpakai: function () {
      var a = parseFloat(this.NomorHusble.item_stok)
      var b = parseFloat(this.tambah_data.Tr_logistic_keluar_total)
      return a - b
    },
  },
}
