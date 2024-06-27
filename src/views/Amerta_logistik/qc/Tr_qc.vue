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
                                    <CFormLabel>PIC</CFormLabel>
                                    <CFormInput type="text" v-model="input_qc.Tr_qc_pic" />
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>No.Transaksi Pembelian</CFormLabel>
                                    <CFormInput type="text" v-model="detail_item.item_history_no_transaksi" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                &nbsp;
                                &nbsp;
                                &nbsp;
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>Nama Barang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_nama" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>Tanggal Datang</CFormLabel>
                                    <CFormInput type="date" v-model="detail_item.item_history_tanggal_datang" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>Supplier</CFormLabel>
                                    <CFormInput type="text" v-model="detail_item.item_history_supplier" readonly />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>Jumlah</CFormLabel>
                                    <CFormInput v-model="detail_data.item_stok" readonly />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Gambar Sebelum</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="input_qc.Tr_qc_gambar_before" /> -->
                                    <CFormInput type="file" @change="handleFileChangeBefore"/>

                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Gambar Sesudah</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="input_qc.Tr_qc_gambar_after" /> -->
                                    <CFormInput type="file" @change="handleFileChangeAfter" />

                                </div>
                            </CCol>
                            <CCol xs="4">
                                &nbsp;
                                &nbsp;
                                &nbsp;
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Keterangan</CFormLabel>
                                    <CFormInput type="text" v-model="input_qc.Tr_qc_keterangan" />
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Tindak lanjut</CFormLabel>
                                    <CFormInput type="text" v-model="input_qc.Tr_qc_tindak_lanjut" />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                &nbsp;
                                &nbsp;
                                &nbsp;
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6"><p>{{total_stok}}</p></CCol>
                        </CRow>
                        <!-- <CRow>
                            <CCol xs="12">
                                <div class="mb-3">
                                    <CFormLabel>Total:</CFormLabel>
                                     <h2>{{ formatCurrency(totalAll) }}</h2>
                                </div>
                            </CCol>
                        </CRow> -->
                        <CButton color="primary" @click.prevent="CreateData">Simpan</CButton>
                        &nbsp;
                        <router-link :to="{ name: 'Kabel' }" tag="button" color="secondary">
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
                    <CButton color="primary" role="button" @click.prevent="addItem">Tambah</CButton>
                    &nbsp;
                    <CButton color="danger" role="button" @click.prevent="removeItem(1)">kurangi</CButton>
                    &nbsp;
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tahapan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Jumlah</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Gambar(Comingsoon)</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in formArray" :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>Tahap {{ index + 1 }}</CTableDataCell>
                                <CTableDataCell>
                                    <CFormInput type="number" v-model="items.Tr_qc_tahap_sisa" />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormInput type="number" v-model="items.Tr_qc_tahap_gambar" />
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/Tr_qc"></script>
  