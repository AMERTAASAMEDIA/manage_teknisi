import Axios from 'axios'
import allSource from '../../../../all.source'
import router from '../../../../router'
export default {
  data() {
    return {
      Visibletambahdata: false,
      data_item: 'Form Tambah Transaksi Pemasukan Logistik',
      data_item2: 'List Data Barang yang akan dibelanjakan',
      list_item: [],
      formArray: [{}],
      tambah_data: {},
      files: null,
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
    addItem() {
      this.formArray.push({
        Tr_detail_logistic_nama_barang: '',
        Tr_detail_logistic_jumlah_barang: '',
        Tr_detail_logistic_harga_barang: '',
        Tr_detail_logistic_satuan_barang: '',
        Tr_detail_logistic_spesifikasi: '',
      })
    },
    removeItem(index) {
      this.formArray.splice(index, 1)
    },
    kembali() {
      this.$router.go(-1)
    },
    getDataSupplier() {
      Axios.get(allSource.getDataSupplier).then((response) => {
        this.list_item = response.data
        // console.log(response.data)
      })
    },
    handleFileChange(event) {
      this.files = event.target.files
    },
    async CreateData() {
      // console.log(this.detaildata)
      // if (!this.files || this.files.length === 0) {
      //     console.log('No files selected');
      //     return;
      // }
      const formData = new FormData()
      // dengan multiple gambar
      if (!this.files || this.files.length === 0) {
        // console.log('No files selected');
        formData.append('Tr_logistic_gambar', 'NO-GAMBAR')
      } else {
        for (let i = 0; i < this.files.length; i++) {
          formData.append('Tr_logistic_gambar', this.files[i])
        }
      }

      // ----
      // dengan formdata
      // formData.append('Tr_logistic_pic', this.tambah_data.Tr_logistic_pic)
      // formData.append(
      //   'Tr_logistic_tanggal',
      //   new Date(this.tambah_data.Tr_logistic_tanggal).toISOString().slice(0, 10),
      // )
      // formData.append('Tr_logistic_supplier', this.tambah_data.Tr_logistic_supplier)
      // formData.append('Tr_logistic_jenis_transaksi', 'NON-PAJAK')
      // formData.append('Tr_logistic_kategori', 'Pemasukan')
      // formData.append('Tr_lokasi_masuk', this.tambah_data.Tr_lokasi_masuk)
      // formData.append('Tr_kode_transaksi', this.tambah_data.Tr_kode_transaksi)
      // formData.append('Tr_logistic_created', new Date().toISOString().slice(0, 10))
      // formData.append('Tr_logistic_total', this.totalAll)
      // formData.append('Tr_logistic_user_created', 'ADMIN-PASURUAN')
      // formData.append('Tr_logistic_status_tiba', this.tambah_data.Tr_logistic_status_tiba)
      // formData.append('Tr_logistic_no_resi', this.tambah_data.Tr_logistic_no_resi)
      // formData.append('Tr_logistic_status', 'Y')
      // formData.append('Tr_logistic_domain', 'AMERTA-PASURUAN')
      // for (let i = 0; i < this.formArray.length; i++) {
      //   formData.append('Tr_logistic_detail', JSON.stringify(this.formArray[i]))
      // }
      // formData.append('Tr_logistic_gambar', this.files)
      // dengan variabel let
      let newdata = {
        Tr_logistic_pic: this.tambah_data.Tr_logistic_pic,
        Tr_logistic_tanggal: this.tambah_data.Tr_logistic_tanggal,
        Tr_logistic_supplier: this.tambah_data.Tr_logistic_supplier,
        Tr_logistic_gambar: 'NO-GAMBAR',
        Tr_logistic_jenis_transaksi: 'NON-PAJAK',
        Tr_logistic_kategori: 'Pemasukan',
        Tr_lokasi_masuk: this.tambah_data.Tr_lokasi_masuk,
        Tr_kode_transaksi: this.tambah_data.Tr_kode_transaksi,
        Tr_logistic_created: new Date().toISOString().slice(0, 10),
        Tr_logistic_total: this.totalAll,
        Tr_logistic_user_created: 'ADMIN-PASURUAN',
        Tr_logistic_status_tiba: this.tambah_data.Tr_logistic_status_tiba,
        Tr_logistic_no_resi: this.tambah_data.Tr_logistic_no_resi,
        Tr_logistic_status: 'Y',
        Tr_logistic_domain: 'AMERTA-PASURUAN',
        Tr_logistic_detail: this.formArray,
        Tr_logistic_gambar: this.files,
      }
      if (!this.tambah_data.Tr_logistic_pic) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'PIC harus diisi',
          icon: 'error',
        })
      } else if (!this.tambah_data.Tr_logistic_status_tiba) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Status kedatangan harus diisi',
          icon: 'error',
        })
      } else if (!this.tambah_data.Tr_kode_transaksi) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Kode Transaksi harus diisi',
          icon: 'error',
        })
      } else if (!this.tambah_data.Tr_logistic_tanggal) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Tanggal harus diisi',
          icon: 'error',
        })
      } else if (!this.tambah_data.Tr_logistic_supplier) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Supplier  harus dipilih',
          icon: 'error',
        })
      } else if (!this.tambah_data.Tr_lokasi_masuk) {
        this.$swal.fire({
          title: 'Gagal!',
          text: 'Lokasi kedatangan  harus dipilih',
          icon: 'error',
        })
      } else {
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
            this.$swal.fire({
              title: 'Berhasil!',
              text: 'Perubahan Telah tersimpan',
              icon: 'success',
            })
            Axios.post(allSource.createDataTransaksiLogistikImage, newdata, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
              .then((response) => {
                // this.getDetailData()
                this.$router.go(-1)
              })
              .catch((error) => {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Ada data yang salah',
                })
              })
          })
      }
    },
  },
  created() {
    this.getDataSupplier()
  },
  computed: {
    totalAll: function () {
      var HitungAll = 0
      for (let i = 0; i < this.formArray.length; i++) {
        HitungAll += parseFloat(
          this.formArray[i].Tr_detail_logistic_harga_barang *
            this.formArray[i].Tr_detail_logistic_jumlah_barang,
        )
      }
      return HitungAll
    },
  },
}
