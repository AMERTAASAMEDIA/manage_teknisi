<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Laporan Pemakaian Kabel(Harian)</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                        <div class="col-sm-5">
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="date" v-model="cari" />
                            &nbsp;
                            &nbsp;
                        </div>
                    </CRow>
                    <!-- <DocsExample href="components/table.html#bordered-tables"> -->
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">No Husble</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Kode</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Meter</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Tanggal Keluar</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.Tr_logistic_keluar_detail.Tr_logistic_keluar_detail_no_husble }}</CTableDataCell>
                                    <!-- <CTableDataCell>
                                        <CButton color="secondary" role="button" @click="lihatgambar(items)">Lihat</CButton>
                                    </CTableDataCell> -->
                                    <CTableDataCell>{{ items.Tr_logistic_keluar_kode_transaksi }}</CTableDataCell>
                                    <CTableDataCell>{{ items.Tr_logistic_keluar_total }}</CTableDataCell>
                                    <CTableDataCell>{{ items.Tr_logistic_keluar_created }}</CTableDataCell>
                                    <!-- <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga * items.item_stok)) }}
                                    </CTableDataCell> -->
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
                            <CPaginationItem @click="next()" aria-label="Next" href="#"><span
                                    aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                    <!-- </DocsExample> -->
                </CCardBody>
            </CCard>
        </CCol>
         <!-- Untuk lihat gambar  -->
         <CModal :visible="VisibleLihatGambar" @close="() => { VisibleLihatGambar = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Lihat Gambar {{ lihat_item.item_nama }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p><a :href=imageUrl>Link</a></p>
                <CImage rounded thumbnail :src=imageUrl width="200" height="200" />
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { VisibleLihatGambar = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
        <!-- Untuk update gambar  -->
    </CRow></template>
<script src="./Service/laporan_pemakaian_kabel.jsx"></script>
  