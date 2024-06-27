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
                            <CCol xs="4">
                                <div class="mb-3">
                                    <CFormLabel>Nama Barang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_nama" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                <div class="mb-3">
                                    <CFormLabel>Stok</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_stok" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                <div class="mb-3">
                                    <CFormLabel>Lokasi Gudang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_domain" readonly />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <!-- <CFormLabel>{{ list_untuk_kode_sn }}</CFormLabel> -->

                                    <CFormLabel>Harga Permeter / PCS</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="(detail_data.item_harga)" readonly /> -->
                                    <!-- <p>{{ formatCurrency(parseFloat(detail_data.item_harga)) }}</p> -->
                                    <h2>{{ formatCurrency(parseFloat(detail_data.item_harga)) }}</h2>
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Total Aset</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="detail_data.Tr_logistic_tanggal" readonly /> -->
                                    <h1>{{ formatCurrency(parseFloat(detail_data.item_harga * detail_data.item_stok)) }}</h1>
                                </div>
                            </CCol>
                        </CRow>
                        <router-link :to="{ name: 'Item' }" tag="button" color="secondary">
                            <CButton color="secondary">Kembali</CButton>
                        </router-link>
                        &nbsp;
                        <CButton color="primary" @click.prevent="generateForm()" v-show="isVisible">Generate Form</CButton>
                        &nbsp;
                        <CButton color="primary" @click.prevent="CreateForm()" v-show="!isVisible">Konfirmasi Kode SN</CButton>
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
                                <CTableHeaderCell scope="col">KODE SN</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in this.data_array" :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>
                                    <CFormInput type="text" v-model="item_nama[index]" />
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/input_kode_sn"></script>
  