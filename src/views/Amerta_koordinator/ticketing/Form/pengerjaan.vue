<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Form Pengerjaan {{ data_item }}</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <div class="mb-3">
                            <CFormLabel>Kode</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.Tr_task_kode" readonly />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Pegawai List Penanganan</CFormLabel>
                            <Multiselect
                                v-model="detaildata.Tr_task_pegawai_list_penangan"
                                :options="pegawaiList"
                                label="master_pengguna_nama"
                                track-by="master_pengguna_id"
                                placeholder="Select Pegawai"
                                :multiple="true"
                                :taggable="true"
                                @tag="addTag"
                            />
                        </div>
                        <CButton color="primary" @click.prevent="PengerjaanDetailData()">Konfirmasi</CButton> &nbsp;
                        <!-- <CButton color="secondary" @click="$router.go(-1)">Kembali</CButton> &nbsp; -->
                        <!-- <CButton color="secondary" :to="{name:'Supplier'}">Kembali</CButton> &nbsp; -->
                        <router-link :to="{name:'Ticketing'}" tag="button" color="secondary"><CButton color="secondary">Kembali</CButton></router-link>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script src="./Service/edit_ticketing"></script>
  