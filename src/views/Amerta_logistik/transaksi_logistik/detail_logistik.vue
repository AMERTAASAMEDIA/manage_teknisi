<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item }}</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <CRow>
                            <CCol xs="8">
                                <div class="mb-3">
                                    <CFormLabel>PIC</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_logistic_pic" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                <div class="mb-3">
                                    <CFormLabel>STATUS PESANAN</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_logistic_status_tiba" readonly />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>No.TRANSAKSI</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_kode_transaksi" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>TANGGAL</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_logistic_tanggal" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>SUPPLIER</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_logistic_supplier" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>NO.RESI</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.Tr_logistic_no_resi" readonly />
                                    <!-- <CFormInput type="text" v-model="detail_data.Tr_kode_transaksi" readonly />
                                     -->
                                     <!-- <a :href="detail_data.Tr_lokasi_masuk">{{detail_data.Tr_lokasi_masuk}}</a> -->
                                     <!-- <router-link :to="detail_data.Tr_lokasi_masuk">{{detail_data.Tr_lokasi_masuk}}</router-link> -->
                                </div>
                            </CCol>
                        </CRow>
                        
                        <CRow>
                            <CCol xs="12">
                                <div class="mb-3">
                                    <CFormLabel>LOKASI DROPZONE</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="detail_data.Tr_kode_transaksi" readonly />
                                     -->
                                     <a :href="detail_data.Tr_lokasi_masuk">{{detail_data.Tr_lokasi_masuk}}</a>
                                     <!-- <router-link :to="detail_data.Tr_lokasi_masuk">{{detail_data.Tr_lokasi_masuk}}</router-link> -->
                                </div>
                            </CCol>
                        </CRow>
                        <router-link :to="{ name: 'TransaksiLogistik' }" tag="button" color="secondary">
                            <CButton color="secondary">Kembali</CButton>
                        </router-link>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item2 }}</strong>
                </CCardHeader>
                <CCardBody>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Satuan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in detail_data.Tr_logistic_detail"
                                :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.Tr_detail_logistic_nama_barang }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_detail_logistic_jumlah_barang }}</CTableDataCell>
                                <CTableDataCell>{{ formatCurrency(parseFloat(items.Tr_detail_logistic_harga_barang)) }}</CTableDataCell>
                                <CTableDataCell>{{ formatCurrency(parseFloat(items.Tr_detail_logistic_harga_barang *  items.Tr_detail_logistic_jumlah_barang)) }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_detail_logistic_satuan_barang }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_detail_logistic_spesifikasi }}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    </CCol>
</CRow></template>
<script src="./Service/detail_logistik"></script>
  