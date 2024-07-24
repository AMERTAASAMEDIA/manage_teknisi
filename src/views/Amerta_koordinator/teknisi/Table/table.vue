<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        DATA TEKNISI YANG BEKERJA DENGAN AMERTA ASA MEDIA.
                        {{ this.$store.getters.Auth_name }}
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Data Teknisi</strong> <small>#</small>
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
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Spesialisasi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">No.Telepon</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.nama_teknisi }}</CTableDataCell>
                                <CTableDataCell>{{ items.alamat_teknisi }}</CTableDataCell>
                                <CTableDataCell>{{ items.spesialisasi }}</CTableDataCell>
                                <CTableDataCell>{{ items.no_telepon_teknisi }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detaildatateknisi(items)">Detail</CDropdownItem>
                                            <CDropdownItem><router-link :to="{name:'EditTeknisi',params:{id:items._id}}">Edit</router-link></CDropdownItem>
                                            <CDropdownItem @click="hapusdatateknisi(items._id)">Hapus</CDropdownItem>
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
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan Data Teknisi</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Teknisi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.nama_teknisi" />
                    </div>
                    <!-- Alamat Teknisi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Alamat Teknisi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="data.alamat_teknisi"></textarea>
                    </div>
                    <!-- Spesialisasi Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Spesialisasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Spesialisasi" v-model="data.spesialisasi" />
                    </div>
                    <!-- Telepon Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No.Telepon" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="data.no_telepon_teknisi" />
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
                <CModalTitle id="LiveDemoExampleLabel">Detail Data Teknisi</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Teknisi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.nama_teknisi" readonly />
                    </div>
                    <!-- Alamat Teknisi -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Alamat Teknisi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="detaildata.alamat_teknisi" readonly></textarea>
                    </div>
                    <!-- Spesialisasi Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Spesialisasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Spesialisasi" v-model="detaildata.spesialisasi" readonly />
                    </div>
                    <!-- Telepon Teknisi  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No.Telepon" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.no_telepon_teknisi" readonly />
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
