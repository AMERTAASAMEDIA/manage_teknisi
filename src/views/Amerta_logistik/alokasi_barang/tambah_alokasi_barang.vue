<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item }} {{ NoTransaksiFix }}</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <CRow>
                            <CCol xs="4">
                                <div class="mb-4">
                                    <CFormLabel>Nama Barang</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_list_nama" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                <div class="mb-4">
                                    <CFormLabel>Jumlah</CFormLabel>
                                    <CFormInput type="text" value="1" readonly />
                                </div>
                            </CCol>
                            <CCol xs="4">
                                <div class="mb-4">
                                    <CFormLabel>Harga</CFormLabel>
                                    <CFormInput type="text" v-model="detail_data.item_list_harga" readonly />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Keperluan</CFormLabel>
                                    <CFormInput type="text" v-model="tambah_data.Tr_logistic_keluar_keperluan" />
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>TANGGAL</CFormLabel>
                                    <CFormInput type="date" v-model="tambah_data.Tr_logistic_keluar_tanggal" />
                                    <!-- <input type="date" class="form-control" v-model="form_khusus_tanggal"> -->
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="6">
                                <div class="mb-3">
                                    <CFormLabel>Alamat</CFormLabel>
                                    <CFormTextarea v-model="tambah_data.Tr_logistic_keluar_alamat"></CFormTextarea>
                                </div>
                            </CCol>
                            <CCol xs="6">
                                <label>Kategori</label>
                                <select class="form-control" v-model="tambah_data.Tr_logistic_keluar_kategori">
                                    <option value="Jalur">Jalur</option>
                                    <option value="PSB">PSB</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </CCol>
                        </CRow>
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
                                <CTableHeaderCell scope="col">Nama.Pegawai</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in formArray" :key="index">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>
                                    <CFormInput type="text" v-model="items.Tr_logistic_keluar_list_pegawai" />
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/tambah_alokasi_barang"></script>
  