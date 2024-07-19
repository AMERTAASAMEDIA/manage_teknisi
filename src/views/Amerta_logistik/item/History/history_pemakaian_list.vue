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
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Nama Barang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_list_nama" readonly />
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Lokasi Gudang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_list_domain" readonly />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Harga Permeter / PCS</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="(detail_data.item_harga)" readonly /> -->
                                    <!-- <p>{{ formatCurrency(parseFloat(detail_data.item_harga)) }}</p> -->
                                    <h2>{{ formatCurrency(parseFloat(detail_data.item_list_harga)) }}</h2>
                                </div>
                            </CCol>
                        </CRow>
                        <router-link :to="{ name: 'Item' }" tag="button" color="secondary">
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
                                <CTableHeaderCell scope="col">No Transaksi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Keperluan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in detail_data.item_list_history" :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.item_list_history_no_transaksi }}</CTableDataCell>
                                <!-- nanti dilinkan  -->
                                <CTableDataCell>{{ items.item_list_history_keperluan}}</CTableDataCell> 
                                <!-- ---- -->
                                <CTableDataCell>{{ items.item_list_history_tanggal }}</CTableDataCell>
                                <CTableDataCell>{{ items.item_list_history_kategori }}</CTableDataCell>

                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/history_pemakaian_list"></script>
  