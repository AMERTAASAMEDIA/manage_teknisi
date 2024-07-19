import Axios from "axios"
import allSource from "../../../../all.source"
import router from "../../../../router"
export default {
    data() {
        return {
            Visibletambahdata: false,
            data_item: "Form Update QC(Coming soon)",
            data_item2: "Tahapan",
            list_item: [],
            formArray: [{}],
            detail_data: {},
            detail_item: {},
            input_qc: {},
            total_stok: {},
            files_before: null,
            files_after: null
        }
    },
    methods: {
        handleFileChangeBefore(event) {
            this.files_before = event.target.files[0];
        },
        handleFileChangeAfter(event) {
            this.files_after = event.target.files[0];
        },
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        addItem() {
            this.formArray.push({
                Tr_qc_tahap_sisa: '',
                Tr_qc_tahap_gambar: ''
            })
        },
        getdetail() {
            this.detail_item = {};
            Axios.get(allSource.getDataItemById + this.$route.params.id).then((response) => {
                this.detail_data = response.data
                const baru_data = response.data.item_history.slice(-1)
                baru_data.forEach((value, index) => {
                    this.detail_item = value
                });
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

            });
        },
        CreateData() {
            // console.log(this.detaildata)
            const formData = new FormData();
            // dengan multiple gambar 
            // if (!this.files || this.files.length === 0) {
            //     // console.log('No files selected');
            //     this.$swal.fire({
            //         icon: "error",
            //         title: "Oops...",
            //         text: "File masih belum diisi",
            //     })
            // } else {
                // Pake newData 
                let newdata = {
                    "Tr_qc_pic": this.input_qc.Tr_qc_pic,
                    "Tr_qc_supplier": this.detail_item.item_history_supplier,
                    "Tr_qc_status": "Y",
                    "Tr_qc_nama_barang": this.detail_data.item_nama,
                    "Tr_qc_jumlah": this.detail_data.item_stok,
                    "Tr_qc_tahap": this.formArray,
                    "Tr_qc_before": this.input_qc.Tr_qc_gambar_before,
                    "Tr_qc_after": this.input_qc.Tr_qc_gambar_after,
                    "Tr_qc_keterangan": this.input_qc.Tr_qc_keterangan,
                    "Tr_qc_tindak_lanjut": this.input_qc.Tr_qc_tindak_lanjut,
                    "Tr_qc_domain": "AMERTA-PASURUAN",
                    "Tr_qc_created": new Date().toISOString().slice(0, 10),
                    "Tr_qc_user_updated": "ADMIN-PASURUAN",
                    "Tr_qc_no_transaksi": this.detail_item.item_history_no_transaksi,
                }
                // Pake formData 
                formData.append("Tr_qc_pic", this.input_qc.Tr_qc_pic);
                formData.append("Tr_qc_supplier", this.detail_item.item_history_supplier);
                formData.append("Tr_qc_status", "Y");
                formData.append("Tr_qc_nama_barang", this.detail_data.item_nama);
                formData.append("Tr_qc_jumlah", this.detail_data.item_stok);
                formData.append("Tr_qc_tahap", this.formArray);
                formData.append("Tr_qc_keterangan", this.input_qc.Tr_qc_keterangan);
                formData.append("Tr_qc_tindak_lanjut", this.input_qc.Tr_qc_tindak_lanjut);
                formData.append("Tr_qc_domain", "AMERTA-PASURUAN");
                formData.append("Tr_qc_created", new Date().toISOString().slice(0, 10));
                formData.append("Tr_qc_user_updated", "ADMIN-PASURUAN");
                formData.append("Tr_qc_no_transaksi", this.detail_item.item_history_no_transaksi);
                formData.append("Tr_qc_after", this.files_after);
                formData.append("Tr_qc_before", this.files_before);
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
                    Axios.post(allSource.createDataTransaksiQcGambar, formData, {
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
            // }

            // this.$swal.fire({
            //     title: "Simpan perubahan?",
            //     text: "Apakah anda yakin Ingin menambah data ?",
            //     icon: "warning",
            //     showCancelButton: true,
            //     confirmButtonColor: "#3085d6",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: "Konfirmasi"
            // }).then((result) => {
            //     this.$swal.fire({
            //         title: "Berhasil!",
            //         text: "Perubahan Telah tersimpan",
            //         icon: "success"
            //     });
            //     // console.log(newdata)
            //     Axios.post(allSource.createDataTransaksiQC, newdata)
            //         .then((response) => {
            //             // this.getDetailData()
            //             this.$router.go(-1)
            //         }).catch((error) => {
            //             this.$swal.fire({
            //                 icon: "error",
            //                 title: "Oops...",
            //                 text: "Ada data yang salah",
            //             })
            //         })
            // })

        }
    },
    created() {
        this.getdetail()
    },
    computed: {
        getLatestTransaction: function () {
            this.total_stok = {};
            // JSON.parse(this.formArray.slice(-1))
            this.formArray.slice(-1).forEach((value, index) => {
                return this.total_stok = value
            })
        }
    }
}
