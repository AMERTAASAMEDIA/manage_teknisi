<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Form Ubah Data Supplier</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <div class="mb-3">
                            <CFormLabel>Nama Supplier</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_supplier_nama" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Alamat Supplier</CFormLabel>
                            <CFormTextarea rows="3" v-model="detaildata.master_supplier_alamat"></CFormTextarea>
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Nama Toko</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_supplier_toko" />
                        </div>
                        <!-- <div class="mb-3">
                            <CFormLabel>Status Aktif</CFormLabel>
                            <CFormSelect aria-label="Default select example">
                                <option value="Aktif">Aktif</option>
                                <option value="Nonaktif">Nonaktif</option>
                            </CFormSelect>
                        </div> -->
                        <div class="mb-3">
                            <CFormLabel>No.Telepon(Nunggu API)</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_supplier_phone" />
                        </div>
                        <CButton color="primary" @click.prevent="UpdateDetailData()">Konfirmasi</CButton> &nbsp;
                        <!-- <CButton color="secondary" @click="$router.go(-1)">Kembali</CButton> &nbsp; -->
                        <!-- <CButton color="secondary" :to="{name:'Supplier'}">Kembali</CButton> &nbsp; -->
                        <router-link :to="{name:'Supplier'}" tag="button" color="secondary"><CButton color="secondary">Kembali</CButton></router-link>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/edit_supplier"></script>
  