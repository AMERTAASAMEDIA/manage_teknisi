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
                    <strong>Data Supplier</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                        <div class="col-sm-5">
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="text" v-model="cari" placeholder="Cari" />
                        </div>
                    </CRow>
                    <CTable bordered>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">PIC</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Nama Barang</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Sisa</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Jumlah Tahap</CTableHeaderCell>
                                <CTableHeaderCell scope="col" colspan="2">Gambar</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                                <CTableHeaderCell scope="col">Before</CTableHeaderCell>
                                <CTableHeaderCell scope="col">After</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>


                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ items.Tr_qc_pic }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_qc_nama_barang }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_qc_jumlah }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_qc_tahap.length }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_qc_before }}</CTableDataCell>
                                <CTableDataCell>{{ items.Tr_qc_after }}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detailData(items)">Detail</CDropdownItem>
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
        <!-- Modal Detail Data  -->
        <CModal :visible="Visibledetaildata" @close="() => { Visibledetaildata = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Detail QC</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama PIC" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.Tr_qc_pic" readonly />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <textarea class="form-control" v-model="detaildata.Tr_qc_nama_barang" readonly></textarea>
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Sisa Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detaildata.Tr_qc_jumlah" readonly />
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <p>Gambar Sebelum</p>
                        </div>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <div class="col-auto">
                            <p>Gambar Sesudah</p>
                        </div>
                    </div>
                    <div class="col-auto">
                        <CImage rounded thumbnail :src=ImageUrlBefore width="200" height="200" />
                    </div>
                    <div class="col-auto">
                        <CImage rounded thumbnail :src=ImageUrlAfter width="200" height="200" />
                    </div>
                </CForm>
                <CTable bordered>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">No</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tahap</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Sisa</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        <CTableRow v-for="(items, index) in detaildata.Tr_qc_tahap" :key="items._id">
                            <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                            <CTableDataCell>Tahap {{ index + 1 }}</CTableDataCell>
                            <CTableDataCell>{{ items.Tr_qc_tahap_sisa }}</CTableDataCell>
                        </CTableRow>
                    </CTableBody>
                </CTable>
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
<script src="./Service/list_qc.jsx"></script>
  