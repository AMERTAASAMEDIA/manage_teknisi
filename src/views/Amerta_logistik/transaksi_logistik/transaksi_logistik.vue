<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        PEMBELIAN BARANG YANG AKAN DIGUNAKAN
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item }}</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                        <div class="col-sm-2">
                            <router-link to="tambah_transaksi_logistik">
                                <CButton color="primary" role="button">Tambah Data</CButton>
                            </router-link>
                        </div>
                        <div class="col-sm-5">
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                    &nbsp;
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">NO TRANSAKSI</CTableHeaderCell>
                                <CTableHeaderCell scope="col">PIC</CTableHeaderCell>
                                <CTableHeaderCell scope="col">STATUS PESANAN</CTableHeaderCell>
                                <CTableHeaderCell scope="col">TOTAL PENGELUARAN</CTableHeaderCell>
                                <CTableHeaderCell scope="col">NO RESI</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Bukti Transaksi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.Tr_kode_transaksi }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_logistic_pic }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_logistic_status_tiba }}</CTableDataCell>
                                <CTableDataCell>{{ formatCurrency(parseFloat(items.Tr_logistic_total)) }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_logistic_no_resi }}</CTableDataCell>
                                <CTableDataCell><CButton color="secondary" role="button" @click="lihatgambar(items)">Lihat Gambar</CButton></CTableDataCell>
                                <!-- <CTableDataCell>{{ formatCurrency(parseFloat(items.master_harga_material_supplier_list[0].master_harga_material_supplier_list_harga)) }}</CTableDataCell> -->
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem>
                                                <router-link
                                                    :to="{ name: 'DetailTransaksiLogistik', params: { id: items._id } }">Detail</router-link>
                                            </CDropdownItem>
                                            <CDropdownItem v-show="items.Tr_logistic_status_tiba === 'Processing' || items.Tr_logistic_status_tiba === 'Shipping'" @click="updateStatusPengiriman(items)">Update Status Pengiriman
                                            </CDropdownItem>
                                            <CDropdownItem @click="hapusdata()">Hapus</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                    <CPagination aria-label="Page navigation example">
                        <CPaginationItem @click="prev()" aria-label="Previous" href="#"><span
                                aria-hidden="true">&laquo;</span>
                        </CPaginationItem>
                        <CPaginationItem @click="prev()">{{ current - 1 }}</CPaginationItem>
                        <CPaginationItem href="#" active>{{ current }}</CPaginationItem>
                        <CPaginationItem @click="next()">{{ current + 1 }}</CPaginationItem>
                        <CPaginationItem @click="next()" aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span>
                        </CPaginationItem>
                    </CPagination>
                </CCardBody>
            </CCard>
        </CCol>
        <!-- Modal untuk menunjukan bukti gambar  -->
        <CModal :visible="VisibleGambar" @close="() => { VisibleGambar = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Hapus Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p><a :href=detailgambar>Link</a></p>
                <CImage rounded thumbnail :src= detailgambar width="200" height="200"/>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { VisibleGambar = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
        <!-- Modal untuk hapus data disuruh menghubungi  -->
        <CModal :visible="Visiblehapusdata" @close="() => { Visiblehapusdata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Hapus Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p>Jika ingin menghapus data silahkan hubungi no berikut:085732733793</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visiblehapusdata = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
        <!-- Modal untuk update Pesanan  -->
        <CModal :visible="VisibleUpdatePesananData" @close="() => { VisibleUpdatePesananData = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Hapus Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <div class="col-auto">
                        <CFormInput type="text" value="NO RESI" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.Tr_logistic_no_resi" />
                    </div>
                </CForm>
                &nbsp;
                <CForm class="row g-4">
                    <div class="col-auto">
                        <CFormInput type="text" value="STATUS PEMESANAN" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormInput type="text" placeholder="Nama" v-model="detaildata.Tr_logistic_status_tiba"/> -->
                        <select class="form-control" v-model="detaildata.Tr_logistic_status_tiba">
                            <option value="Processing">Processing</option>
                            <option value="Shipping">Shipping</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" @click="UpdateData()">Update</CButton>
                <CButton color="secondary" @click="() => { VisibleUpdatePesananData = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
    </CRow>
</template>
<script src="./Service/transaksi_logistik.jsx"></script>
  