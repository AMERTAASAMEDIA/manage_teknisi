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
                            <CFormLabel>Nama</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_nama" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>ID</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_id" readonly />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Alamat</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_alamat" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Role</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_role" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>No Telepon</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_no_telepon"  />
                        </div>
                        <!-- Detail Identitas -->
                        <div class="mb-3">
                            <CFormLabel>KTP</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_detail_identitas_ktp"  />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>NPWP</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.master_pengguna_detail_identitas_npwp"  />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>PIC</CFormLabel>
                            <CFormInput type="text" placeholder="Pic" v-model="detaildata.master_pengguna_pic_psb" />
                        </div>
                        <CButton color="primary" @click.prevent="UpdateDetailData()">Konfirmasi</CButton> &nbsp;
                        <!-- <CButton color="secondary" @click="$router.go(-1)">Kembali</CButton> &nbsp; -->
                        <!-- <CButton color="secondary" :to="{name:'Supplier'}">Kembali</CButton> &nbsp; -->
                        <router-link :to="{name:'Teknisi'}" tag="button" color="secondary"><CButton color="secondary">Kembali</CButton></router-link>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/edit_ticketing"></script>
  