<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        {{ detail_item }}
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>{{ data_item }}</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <div class="col-sm-2">
                            <CButton color="primary" role="button" @click="() => { Visibletambahdata = true }">Tambah Data
                            </CButton>
                            &nbsp;
                            <p></p>
                        </div>
                        <div class="col-sm-5" style="right: -40%;">
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col">No Telepon</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Detail Identitas</CTableHeaderCell>
                                <CTableHeaderCell scope="col">PIC </CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ item.master_pengguna_nama }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_id }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_alamat }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_role }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_no_telepon }}</CTableDataCell>
                                <CTableDataCell>
                                    KTP: {{ item.master_pengguna_detail_identitas.master_pengguna_detail_identitas_ktp }}, 
                                    NPWP: {{ item.master_pengguna_detail_identitas.master_pengguna_detail_identitas_npwp }}
                                </CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_pic }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detaildatasupplier(items)">Detail</CDropdownItem>
                                            <CDropdownItem><router-link :to="{name:'EditTicketing',params:{id:items._id}}">Edit</router-link></CDropdownItem>
                                            <CDropdownItem @click="hapusdataticket(items._id)">Hapus</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                    <CPagination aria-label="Page navigation example">
                        <CPaginationItem @click="prev()" aria-label="Previous" href="#"><span aria-hidden="true">&laquo;</span></CPaginationItem>
                        <CPaginationItem @click="prev()">{{ current - 1 }}</CPaginationItem>
                        <CPaginationItem href="#" active>{{ current }}</CPaginationItem>
                        <CPaginationItem @click="next()">{{ current + 1 }}</CPaginationItem>
                        <CPaginationItem @click="next()" aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span></CPaginationItem>
                    </CPagination>
                </CCardBody>
            </CCard>
        </CCol>
        <!-- modal tambah data  -->
        <CModal :visible="Visibletambahdata" @close="() => { Visibletambahdata = false }" aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan {{ data_item }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_pengguna_nama" />
                    </div>
                   <!-- ID -->
                   <div class="col-auto">
                        <CFormInput type="text" value="ID" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="ID" v-model="data.master_pengguna_id" />
                    </div>
                    <!-- Alamat -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Alamat" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Alamat" v-model="data.master_pengguna_alamat" />
                    </div>
                    <!-- Role -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Role" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Role" v-model="data.master_pengguna_role" />
                    </div>
                    <!-- No Telepon -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No Telepon" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="No Telepon" v-model="data.master_pengguna_no_telepon" />
                    </div>
                    <!-- Detail Identitas -->
                    <div class="col-auto">
                        <CFormInput type="text" value="KTP" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="KTP" v-model="data.master_pengguna_detail_identitas_ktp" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="NPWP" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="NPWP" v-model="data.master_pengguna_detail_identitas_npwp" />
                    </div>
                    <!-- Tanggal -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Tanggal" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="date" placeholder="Tanggal" v-model="data.Tr_task_created" />
                    </div>
                    <!-- Detail -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Detail" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Detail" v-model="data.Tr_task_detail" />
                    </div>
                    <!-- PIC -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Pic" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Pic" v-model="data.Tr_task_pic" />
                    </div>
                    <!-- Pegawai -->
                    <!-- <div class="col-auto">
                        <CFormInput type="text" value="Pegawai" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Pegawai" v-model="data.Tr_task_pegawai_list_penangan" />
                    </div> -->
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibletambahdata = false }">
                    Tutup
                </CButton>
                <CButton color="primary" @click.prevent="createData()">Tambahkan</CButton>
            </CModalFooter>
        </CModal>
        <!-- ---- -->
        <!-- Modal Detail Data  -->
        <CModal :visible="Visibledetaildata" @close="() => { Visibledetaildata = false }" aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Detail Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Kode -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Kode" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_kode" readonly />
                    </div>
                    <!-- Status -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Status" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_status" readonly />
                    </div>
                    <!-- Prioritas -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Prioritas" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_priority" readonly />
                    </div>
                    <!-- Kategori -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Kategori" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_kategori" readonly />
                    </div>
                    <!-- Tanggal -->
                    <div class="col-auto">
                        <CFormInput type="date" value="Tanggal" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="date" v-model="detaildata.Tr_task_created" readonly />
                    </div>
                    <!-- Detail -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Detail" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_detail" readonly />
                    </div>
                    <!-- Pegawai -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Pegawai" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.Tr_task_pegawai_list_penangan" readonly />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibledetaildata = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
        <!-- ---- -->
    </CRow>
</template>
<script src="./Service_table.jsx"></script>

