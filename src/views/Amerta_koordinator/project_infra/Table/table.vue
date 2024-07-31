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
                    <strong>Tabel {{ data_item }} </strong> <small>(On Progress)</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <div class="col-sm-2">
                            <p></p>
                            <p></p>
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
                                <CTableHeaderCell scope="col">Nama Pelanggan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">No Telepon Pelanggan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Alamat Pelanggan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Prioritas</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Pic</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Teknisi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.Tr_task_nama }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_no_telepon }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_alamat }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_priority }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_kategori }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_created }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_pic }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_task_pegawai_list_penangan }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detaildatasupplier(items)">Detail</CDropdownItem>
                                            <CDropdownItem><router-link :to="{name:'EditInfra',params:{id:items._id}}">Edit</router-link></CDropdownItem>
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
                    <!-- Nama -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Pelanggan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama Pelanggan" v-model="detaildata.Tr_task_nama" readonly/>
                    </div>
                    <!-- No Telepon -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No Telepon Pelanggan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="No Telepon Pelanggan" v-model="detaildata.Tr_task_no_telepon" readonly/>
                    </div>
                    <!-- Alamat -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Alamat Pelanggan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Alamat Pelanggan" v-model="detaildata.Tr_task_alamat" readonly/>
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
                        <CFormInput type="text" value="Tanggal" readonly plain-text />
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
                    <!-- PIC -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Pic" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Pic" v-model="detaildata.Tr_task_pic" readonly/>
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

