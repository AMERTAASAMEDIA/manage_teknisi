import Axios from "axios"
import allSource from "../../../../all.source";
export default {
    data() {
        return {
            Visibletambahdata: false,
            Visibledetaildata: false,
            data_item: "Data List Material",
            list_item: [],
            cari: '',
            current: 1,
            pageSize: 10,
            // CREATE DATA 
            data: {},
            detaildata: {},
        }
    },
    methods: {
        // Format rupiah 
        formatCurrency(amount) {
            return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
        },
        // Temp hapus data 
        hapusdatasupplier(id) {
            // alert(id)
            this.$swal.fire({
                title: "Apakah anda yakin?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya"
            }).then((result) => {
                if (result.isDismissed) {
                    this.$swal.fire({
                        title: "Dibatalkan",
                        text: "Anda telah membatalkan aksi",
                        icon: "success"
                    })
                } else {
                    Axios.put(allSource.updateDataHargaMaterial + id, {
                        master_harga_material_status: "N"
                    }).then((response) => {
                        if (response.status = 200) {
                            this.$swal.fire({
                                title: "Berhasil!",
                                text: "Data telah dihapus.",
                                icon: "success"
                            });
                        } else {
                            this.$swal.fire({
                                title: "Gagal!",
                                text: "Data gagal dihapus.",
                                icon: "danger"
                            });
                        }
                        this.getdata()
                    })
                }
            });
        },
        // DETAIL DATA 
        detaildatasupplier(items) {
            this.Visibledetaildata = true
            this.detaildata = items
        },
        // CREATE DATA 
        createData() {
            let newdata = {
                master_supplier_nama: this.data.master_supplier_nama,
                master_supplier_status: "Y",
                master_supplier_alamat: this.data.master_supplier_alamat,
                master_supplier_toko: this.data.master_supplier_toko,
                master_supplier_toko_status: "Aktif",
                master_supplier_created: new Date().toISOString().slice(0, 10),
                master_supplier_updated: new Date().toISOString().slice(0, 10),
                master_supplier_user_updated: "COMING SOON FOR USER",
                master_supplier_phone: this.data.master_supplier_phone
            }
            // Clear after modal box closed 
            Axios.post(allSource.createDataSupplier, newdata).then(() => {
                this.$swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Data Berhasil Tersimpan",
                    showConfirmButton: false,
                    timer: 1500
                });
                this.Visibletambahdata = false;
                this.data = {}
                this.getdata()
            }).catch((error) => {
                console.log(error)
            })
        },
        // LIST DATA 
        getdata() {
            Axios.get(allSource.getDataHargaMaterial + this.$store.getters.Auth_domain).then((response) => {
                this.list_item = response.data;
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
                var search_nama = item.master_harga_material_nama.toLowerCase().includes(this.cari.toLowerCase());

                return search_nama;
            });
        },
        // Komputasi untuk harga rata rata barang 
        // calculateAverage: function () {
        //     // for (let i = 0; i < this.FilterPost.length; i++) {
        //     //     for (let index = 0; index < this.FilterPost[i].master_harga_material_supplier_list.length; index++) {
        //     //         // const element = array[index];
        //     //         return this.FilterPost[i].master_harga_material_supplier_list[i].master_harga_material_supplier_list_harga / this.FilterPost[i].master_harga_material_supplier_list.length
        //     //     }
                
        //     // }
        //     // for (let index = 0; index < this.list_item.length; index++) {
        //     //     // const element = array[index];
        //     //     return this.list_item[index]
                
        //     // }
        //     // for(let x in this.list_item){
        //         // for(let i in this.list_item[x].master_harga_material_supplier_list){
        //         //     var a = this.list_item[x].master_harga_material_supplier_list[i].master_harga_material_supplier_list_harga 
        //         //     return a
        //         // }
        //         // return this.list_item[x].master_harga_material_supplier_list
        //         // return `Halhal${x}`
                
        //     // }
        //     for (var index = 0; index < this.list_item.length; index++) {
        //         // const element = array[index];
        //         var a =  this.list_item[index].master_harga_material_supplier_list[0].master_harga_material_supplier_list_harga
        //         for (let x = 0; x < this.list_item[index].master_harga_material_supplier_list.length; x++) {
        //             // const element = array[x];
        //             var b = this.list_item[index].master_harga_material_supplier_list[x].master_harga_material_supplier_list_harga / 2
        //         }
                
        //     }
        //     return a
        //     // return this.list_item.length
        //     // for (let index = 0; index < this.FilterPost[1].master_harga_material_supplier_list.length; index++) {
        //     //     // const element = array[index];
        //     //     return this.FilterPost[1].master_harga_material_supplier_list[index].master_harga_material_supplier_list_harga / this.FilterPost[1].master_harga_material_supplier_list.length
        //     // }
        // },
    }
}
