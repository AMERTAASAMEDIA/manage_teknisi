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
                        <!-- {{ this.$store.getters.Auth_username }} -->
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
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Prioritas</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Lokasi</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>


                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.master_supplier_nama }}</CTableDataCell>
                                    <CTableDataCell>{{ items.master_supplier_alamat }}</CTableDataCell>
                                    <CTableDataCell>{{ items.master_supplier_toko }}</CTableDataCell>
                                    <CTableDataCell>
                                        <CDropdown>
                                            <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem @click="detaildatasupplier(items)">Detail</CDropdownItem>
                                                <CDropdownItem><router-link :to="{name:'EditSupplier',params:{id:items._id}}">Edit</router-link></CDropdownItem>
                                                <!-- <router-link :to="{name:'detail_closing',params:{id:closing.id , domain : closing.closing_domain}}"><i class="icon wb-share" aria-hidden="true"></i>Detail</router-link> -->
                                                <CDropdownItem @click="hapusdatasupplier(items._id)">Hapus</CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                        <CPagination aria-label="Page navigation example">
                            <CPaginationItem @click="prev()" aria-label="Previous" href="#"><span
                                    aria-hidden="true">&laquo;</span>
                            </CPaginationItem>
                            <CPaginationItem @click="prev()">{{ current - 1 }}</CPaginationItem>
                            <CPaginationItem href="#" active>{{ current }}</CPaginationItem>
                            <CPaginationItem @click="next()">{{ current + 1 }}</CPaginationItem>
                            <CPaginationItem @click="next()" aria-label="Next" href="#"><span
                                    aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                </CCardBody>
            </CCard>
        </CCol>
        <!-- modal tambah data  -->
        <CModal :visible="Visibletambahdata" @close="() => { Visibletambahdata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan {{ data_item }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Supplier  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_supplier_nama" />
                    </div>
                    <!-- Alamat supplier -->
                    <div class="col-auto">
                        <!-- <CFormLabel for="staticEmail2" class="visually-hidden">Email</CFormLabel> -->
                        <CFormInput type="text" value="Alamat Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="data.master_supplier_alamat"></textarea>
                    </div>
                    <!-- Nama Toko  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Toko" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_supplier_toko" />
                    </div>
                    <!-- Telepon  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No.Telepon(Nunggu API)" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" v-model="data.master_supplier_phone" />
                    </div>
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
        <CModal :visible="Visibledetaildata" @close="() => { Visibledetaildata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Detail Data Supplier</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Supplier  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.master_supplier_nama" readonly />
                    </div>
                    <!-- Alamat supplier -->
                    <div class="col-auto">
                        <!-- <CFormLabel for="staticEmail2" class="visually-hidden">Email</CFormLabel> -->
                        <CFormInput type="text" value="Alamat Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="detaildata.master_supplier_alamat" readonly></textarea>
                    </div>
                    <!-- Nama Toko  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Toko" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.master_supplier_toko" readonly />
                    </div>
                    <!-- Telepon  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="No.Telepon(Nunggu API)" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" v-model="detaildata.master_supplier_phone" readonly />
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
  