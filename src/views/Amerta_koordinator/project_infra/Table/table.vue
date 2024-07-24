<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        DATA PROJECT INFRA YANG DIKELOLA OLEH AMERTA ASA MEDIA.
                        {{ this.$store.getters.Auth_name }}
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Data Project Infra</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <div class="col-sm-2">
                            <CButton color="primary" role="button" @click="() => { Visibletambahdata = true }">Tambah Data</CButton>
                        </div>
                        <div class="col-sm-5">
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama Project</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Lokasi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.nama_project }}</CTableDataCell>
                                <CTableDataCell>{{ items.lokasi }}</CTableDataCell>
                                <CTableDataCell>{{ items.deskripsi }}</CTableDataCell>
                                <CTableDataCell>{{ items.status }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detaildataproject(items)">Detail</CDropdownItem>
                                            <CDropdownItem><router-link :to="{name:'EditProject',params:{id:items._id}}">Edit</router-link></CDropdownItem>
                                            <CDropdownItem @click="hapusdataproject(items._id)">Hapus</CDropdownItem>
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
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan Data Project Infra</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Project -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Project" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama Project" v-model="data.nama_project" />
                    </div>
                    <!-- Lokasi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Lokasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="data.lokasi"></textarea>
                    </div>
                    <!-- Deskripsi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Deskripsi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="data.deskripsi"></textarea>
                    </div>
                    <!-- Status -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Status" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Status" v-model="data.status" />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibletambahdata = false }">Tutup</CButton>
                <CButton color="primary" @click.prevent="createData()">Tambahkan</CButton>
            </CModalFooter>
        </CModal>
        <!-- Modal Detail Data  -->
        <CModal :visible="Visibledetaildata" @close="() => { Visibledetaildata = false }" aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Detail Data Project Infra</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Project -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Project" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama Project" v-model="detaildata.nama_project" readonly />
                    </div>
                    <!-- Lokasi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Lokasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="detaildata.lokasi" readonly></textarea>
                    </div>
                    <!-- Deskripsi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Deskripsi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="detaildata.deskripsi" readonly></textarea>
                    </div>
                    <!-- Status -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Status" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.status" readonly />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibledetaildata = false }">Tutup</CButton>
            </CModalFooter>
        </CModal>
    </CRow>
</template>
<script src="./Service_table.jsx"></script>
