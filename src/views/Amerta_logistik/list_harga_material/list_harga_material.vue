<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        LIST MATERIAL YANG DIBUTUHKAN SERTA PEMBANDING ANTARA 1 SUPPLIER DENGAN YANG LAIN
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
                        <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                        <div class="col-sm-2">
                            <router-link to ="tambah_list_material">
                                <CButton color="primary" role="button">Tambah Data</CButton>
                            </router-link>
                        </div>
                        <div class="col-sm-5">
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nama Material</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Jumlah Supplier</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Rata Rata Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.master_harga_material_nama }}</CTableDataCell>
                                    <CTableDataCell>{{ items.master_harga_material_supplier_list.length }}</CTableDataCell>
                                    <CTableDataCell>{{ formatCurrency(parseFloat(items.master_harga_material_supplier_list[0].master_harga_material_supplier_list_harga)) }}</CTableDataCell>
                                    <!-- <CTableDataCell>{{ formatCurrency(parseFloat(items.master_harga_material_supplier_list.master_harga_material_supplier_list_harga)) }}</CTableDataCell> -->
                                    <!-- <CTableDataCell>{{ formatCurrency(parseFloat(calculateAverage)) }}</CTableDataCell> -->
                                    <CTableDataCell>{{ calculateAverage }}</CTableDataCell>
                                    <CTableDataCell>
                                        <CDropdown>
                                            <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem @click="detaildatasupplier(items)">Detail</CDropdownItem>
                                                <CDropdownItem><router-link :to="{name:'EditListMaterial',params:{id:items._id}}">Edit</router-link></CDropdownItem>
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
        <!-- <CModal :visible="Visibletambahdata" @close="() => { Visibletambahdata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan Data Supplier</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_supplier_nama" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Alamat Supplier" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="data.master_supplier_alamat"></textarea>
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Toko" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_supplier_toko" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="No.Telepon(Nunggu API)" readonly plain-text />
                    </div>
                    <div class="col-auto">
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
        </CModal> -->
        <!-- ---- -->
        <!-- Modal Detail Data  -->
        <CModal :visible="Visibledetaildata" @close="() => { Visibledetaildata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Detail Data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama barang  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <!-- <CFormLabel for="inputPassword2" class="visually-hidden">Password</CFormLabel> -->
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.master_harga_material_nama" readonly />
                    </div>
                    <!-- Tabel supplier yang menyediakan -->
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
                                <CTableRow v-for="(items, index) in detaildata.master_harga_material_supplier_list" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.master_harga_material_supplier_list_nama_supplier }}</CTableDataCell>
                                    <CTableDataCell>{{ formatCurrency(parseFloat(items.master_harga_material_supplier_list_harga)) }}</CTableDataCell>
                                    <CTableDataCell>{{ items.master_harga_material_supplier_list_keterangan }}</CTableDataCell>
                                    
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    
                    
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
<script src="./Service/list_harga_material.jsx"></script>
  