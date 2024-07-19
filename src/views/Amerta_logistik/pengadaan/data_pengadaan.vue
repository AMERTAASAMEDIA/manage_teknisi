<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        Using the most basic table CoreUI, here&#39;s how
                        <code>&lt;CTable&gt;</code>-based tables look in CoreUI.
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
                            <CButton color="primary" role="button" @click="() => { Visibletambahdata = true }">Tambah Data
                            </CButton>
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
                                <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                <CTableHeaderCell scope="col">PIC</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Kebutuhan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Terealisasi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Belum Terealisasi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Harga Belum Terealisasi</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.master_pengadaan_barang_nama }}</CTableDataCell>
                                <CTableDataCell>{{ items.master_pengadaan_barang_pic }}</CTableDataCell>
                                <CTableDataCell>{{ items.master_pengadaan_barang_kategori }}</CTableDataCell>
                                <!-- ini yang nanti dihitung  -->
                                <CTableDataCell>{{ parseFloat(items.master_pengadaan_barang_realisasi_kebutuhan) +
                                    parseFloat(items.master_pengadaan_barang_realisasi_sudah) }}</CTableDataCell>
                                <!-- ---- -->
                                <CTableDataCell>{{ items.master_pengadaan_barang_realisasi_sudah }}</CTableDataCell>
                                <CTableDataCell>{{ items.master_pengadaan_barang_realisasi_kebutuhan }}</CTableDataCell>
                                <CTableDataCell>{{ formatCurrency(parseFloat(items.master_pengadaan_barang_harga)) }}
                                </CTableDataCell>
                                <CTableDataCell>{{
                                    formatCurrency(parseFloat(items.master_pengadaan_barang_realisasi_kebutuhan *
                                        items.master_pengadaan_barang_harga)) }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="updatedata(items)">Update Pengadaan / Data </CDropdownItem>
                                            <!-- <router-link :to="{name:'detail_closing',params:{id:closing.id , domain : closing.closing_domain}}"><i class="icon wb-share" aria-hidden="true"></i>Detail</router-link> -->
                                            <CDropdownItem @click="hapusdata(items._id)">Hapus(On-Progress)
                                            </CDropdownItem>
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
                        <CPaginationItem @click="next()" aria-label="Next" href="#"><span aria-hidden="true">&raquo;</span>
                        </CPaginationItem>
                    </CPagination>
                </CCardBody>
            </CCard>
        </CCol>
        <!-- modal tambah data  -->
        <CModal :visible="Visibletambahdata" @close="() => { Visibletambahdata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan Data Pengadaan</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- Nama Supplier  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_pengadaan_barang_nama" />
                    </div>
                    <!-- Alamat supplier -->
                    <div class="col-auto">
                        <CFormInput type="text" value="PIC Nama" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="data.master_pengadaan_barang_pic" />
                    </div>
                    <!-- Nama Toko  -->
                    <CInputGroup class="mb-3">
                        <CInputGroupText as="label" for="inputGroupSelect01">Kategori</CInputGroupText>
                        <CFormSelect id="inputGroupSelect01" v-model="data.master_pengadaan_barang_kategori">
                            <option>Pilih...</option>
                            <option value="ITEM-OFFICE">BARANG KANTOR</option>
                            <option value="ITEM-FIELD">BARANG LAPANGAN</option>
                        </CFormSelect>
                    </CInputGroup>
                    <div class="col-auto">
                        <CFormInput type="text" value="Kebutuhan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="data.master_pengadaan_barang_realisasi_kebutuhan" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Terealisasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="data.master_pengadaan_barang_realisasi_sudah" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Harga" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="data.master_pengadaan_barang_harga" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="No. Kwitansi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="data.master_pengadaan_no_kuitansi" />
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
                <CModalTitle id="LiveDemoExampleLabel">Update Pengadaan / data</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <!-- <div class="col-auto"> -->
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata._id" hidden />
                    <!-- </div> -->
                    <!-- Nama Supplier  -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.master_pengadaan_barang_nama" />
                    </div>
                    <!-- Alamat supplier -->
                    <div class="col-auto">
                        <CFormInput type="text" value="PIC Nama" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.master_pengadaan_barang_pic" />
                    </div>
                    <!-- Nama Toko  -->
                    <CInputGroup class="mb-3">
                        <CInputGroupText as="label" for="inputGroupSelect01">Kategori</CInputGroupText>
                        <CFormSelect id="inputGroupSelect01" v-model="detaildata.master_pengadaan_barang_kategori">
                            <option>Pilih...</option>
                            <option value="ITEM-OFFICE">BARANG KANTOR</option>
                            <option value="ITEM-FIELD">BARANG LAPANGAN</option>
                        </CFormSelect>
                    </CInputGroup>
                    <div class="col-auto">
                        <CFormInput type="text" value="Kebutuhan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="detaildata.master_pengadaan_barang_realisasi_kebutuhan" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Terealisasi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="detaildata.master_pengadaan_barang_realisasi_sudah" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Harga" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="number" v-model="detaildata.master_pengadaan_barang_harga" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="No. Kwitansi" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" v-model="detaildata.master_pengadaan_no_kuitansi" />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibledetaildata = false }">
                    Tutup
                </CButton>
                <CButton color="primary" @click.prevent="updatePengadaan()">Update</CButton>
            </CModalFooter>
        </CModal>
    <!-- ---- -->
</CRow></template>
<script src="./Service/data_pengadaan.jsx"></script>
  