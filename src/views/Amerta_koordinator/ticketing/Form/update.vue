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
                            <CFormLabel>Kode</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.Tr_task_kode" readonly />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Nama Pelanggan</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.Tr_task_nama" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>No Telepon Pelanggan</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.Tr_task_no_telepon" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Alamat Pelanggan</CFormLabel>
                            <CFormInput type="text" v-model="detaildata.Tr_task_alamat" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Prioritas</CFormLabel>
                            <CFormSelect aria-label="Default select example" v-model="detaildata.Tr_task_priority">
                            <option>Pilih Tingkat Prioritas</option>
                            <option value="high">High</option>
                            <option value="decent">Decent</option>
                            <option value="light">Light</option>
                            </CFormSelect>
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Kategori</CFormLabel>
                            <CFormSelect aria-label="Default select example" v-model="detaildata.Tr_task_kategori">
                            <option>Pilih Kategori Ticketing</option>
                            <option value="psb">PSB</option>
                            <option value="infra">Infra</option>
                            <option value="mt">MT</option>
                            </CFormSelect>
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Tanggal</CFormLabel>
                            <CFormInput type="date" placeholder="Tanggal" v-model="detaildata.Tr_task_created" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>Detail</CFormLabel>
                            <CFormInput type="text" placeholder="Detail" v-model="detaildata.Tr_task_detail" />
                        </div>
                        <div class="mb-3">
                            <CFormLabel>PIC</CFormLabel>
                            <CFormInput type="text" placeholder="Pic" v-model="detaildata.Tr_task_pic" />
                        </div>
                        <CButton color="primary" @click.prevent="UpdateDetailData()">Konfirmasi</CButton> &nbsp;
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
  