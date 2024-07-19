<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item }}</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <div class="mb-3">
                            <CFormLabel>Nama Barang</CFormLabel>
                            <CFormInput type="text" v-model="updatedata.master_harga_material_nama" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>ComingSoon</CFormLabel>
                            <CFormInput type="text" v-model="updatedata.nama_barang" />
                        </div>
                        <CButton color="primary" @click.prevent="UpdateData()">Konfirmasi</CButton> &nbsp;
                        <CButton color="primary" @click="calculatethisAverage()">Hitung Rata rata</CButton> &nbsp;
                        <router-link :to="{name:'ListMaterial'}" tag="button" color="secondary"><CButton color="secondary">Kembali</CButton></router-link>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Data Supplier penyedia barang</strong>
                </CCardHeader>
                <CCardBody>
                    <CButton color="primary" role="button" @click.prevent="addItem">Tambah</CButton>
                    &nbsp;
                    <!-- <CButton color="danger" role="button" @click.prevent="removeItem(1)">kurangi</CButton> -->
                    &nbsp;
                    <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nama Supplier</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in updatedata.master_harga_material_supplier_list" :key="index">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell><CFormInput type="text" v-model="items.master_harga_material_supplier_list_nama_supplier" /></CTableDataCell>
                                    <CTableDataCell><CFormInput type="number" v-model="items.master_harga_material_supplier_list_harga" /></CTableDataCell>
                                    <CTableDataCell><CFormInput type="text" v-model="items.master_harga_material_supplier_list_keterangan" /></CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/edit_list_harga_material"></script>
  