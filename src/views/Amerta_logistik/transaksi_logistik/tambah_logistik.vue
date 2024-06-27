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
                                    <CFormInput type="text" v-model="tambah_data.Tr_logistic_pic" />
                                </div>
                            </CCol>
                            <!-- <CCol xs="4">
                                &nbsp;
                                <CFormLabel>Bukti Transaksi</CFormLabel>
                                <CInputGroup class="mb-3">
                                    <CFormInput type="file" id="inputGroupFile02" @change="handleFileChange" multiple />
                                    <CInputGroupText as="label" for="inputGroupFile02">Upload</CInputGroupText>
                                </CInputGroup>
                            </CCol> -->
                            <CCol xs="4">
                                &nbsp;
                                <CInputGroup class="mb-3">
                                    <CInputGroupText as="label" for="inputGroupSelect01">STATUS PESANAN</CInputGroupText>
                                    <CFormSelect id="inputGroupSelect01" v-model="tambah_data.Tr_logistic_status_tiba">
                                        <option>Pilih...</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipping">Shipping</option>
                                        <!-- <option value="Delivered">Delivered</option> -->
                                    </CFormSelect>
                                </CInputGroup>

                            </CCol>

                        </CRow>
                        <CRow>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>No.TRANSAKSI</CFormLabel>
                                    <CFormInput type="text" v-model="tambah_data.Tr_kode_transaksi" />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>TANGGAL</CFormLabel>
                                    <CFormInput type="date" v-model="tambah_data.Tr_logistic_tanggal" />
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>SUPPLIER</CFormLabel>
                                    <!-- <CFormInput type="text" v-model="tambah_data.Tr_logistic_supplier" /> -->
                                    <select class="form-control" v-model="tambah_data.Tr_logistic_supplier">
                                        <option v-for="(supplier, index) in list_item" :key="supplier._id">
                                            {{ supplier.master_supplier_nama }}
                                        </option>
                                    </select>
                                </div>
                            </CCol>
                            <CCol xs="3">
                                <div class="mb-3">
                                    <CFormLabel>NO.RESI</CFormLabel>
                                    <CFormInput type="text" v-model="tambah_data.Tr_logistic_no_resi" />
                                </div>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12">
                                <div class="mb-3">
                                    <CFormLabel>LOKASI DROPZONE(Link)</CFormLabel>
                                    <CFormTextarea v-model="tambah_data.Tr_lokasi_masuk"></CFormTextarea>
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12">
                                <div class="mb-3">
                                    <CFormLabel>Total:</CFormLabel>
                                    <!-- <CFormInput type="number" v-model="totalAll" /> -->
                                    <!-- <CFormTextarea v-model="tambah_data.Tr_lokasi_masuk"></CFormTextarea>
                                     -->
                                    <h2>{{ formatCurrency(totalAll) }}</h2>
                                </div>
                            </CCol>
                        </CRow>
                        <CButton color="primary" @click.prevent="CreateData">Simpan</CButton>
                        &nbsp;
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
                    <CButton color="primary" role="button" @click.prevent="addItem">Tambah</CButton>
                    &nbsp;
                    <CButton color="danger" role="button" @click.prevent="removeItem(1)">kurangi</CButton>
                    &nbsp;
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
                            <CTableRow v-for="(items, index) in formArray" :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>
                                    <CFormInput type="text" v-model="items.Tr_detail_logistic_nama_barang" />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormInput type="number" v-model="items.Tr_detail_logistic_jumlah_barang" />
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormInput type="number" v-model="items.Tr_detail_logistic_harga_barang" />
                                </CTableDataCell>
                                <CTableDataCell>{{ formatCurrency(parseFloat(items.Tr_detail_logistic_jumlah_barang *
                                    items.Tr_detail_logistic_harga_barang)) }}</CTableDataCell>
                                <CTableDataCell>
                                    <select class="form-control" v-model="items.Tr_detail_logistic_satuan_barang">
                                        <option value="PCS">PCS</option>
                                        <option value="Meter">Meter</option>
                                    </select>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CFormInput type="text" v-model="items.Tr_detail_logistic_spesifikasi" />
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/tambah_logistik"></script>
  