<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                        DATA KABEL DARI PEMBELIAN
                    </p>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Data Item</strong> <small>#</small>
                </CCardHeader>
                <CCardBody>
                    <CRow class="mb-6">
                        <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                        <div class="col-sm-5">
                            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
                            <CFormInput type="text" v-model="cari" />
                        </div>
                    </CRow>
                    <p></p>
                        <CTable bordered>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">No</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Gambar</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Stok(Meter)</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.item_nama }}</CTableDataCell>
                                    <CTableDataCell>
                                        <CButton color="secondary" role="button" @click="lihatgambar(items)">Lihat</CButton>
                                    </CTableDataCell>
                                    <CTableDataCell>{{ items.item_stok }}</CTableDataCell>
                                    <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga)) }}</CTableDataCell>
                                    <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga * items.item_stok)) }}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CDropdown>
                                            <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                            <CDropdownMenu>
                                                <CDropdownItem @click="updategambar(items)">Update Gambar & Husble</CDropdownItem>
                                                <!-- <CDropdownItem @click="detaildata(items)">Detail</CDropdownItem> -->
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'InputKabel', params: { id: items._id } }">Pemakaian kabel</router-link>
                                                </CDropdownItem>
                                                <!-- <router-link :to="{name:'detail_closing',params:{id:closing.id , domain : closing.closing_domain}}"><i class="icon wb-share" aria-hidden="true"></i>Detail</router-link> -->
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'HistoryPemakaian', params: { id: items._id } }">History Pemakaian</router-link>
                                                </CDropdownItem>
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'HistoryPembelian', params: { id: items._id } }">History Pembelian</router-link>
                                                </CDropdownItem>
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'EditSupplier', params: { id: items._id } }">History Penjualan(COMING SOON)</router-link>
                                                </CDropdownItem>
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'UpdateTransaksiQc', params: { id: items._id } }">Tahap QC</router-link>
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
                            <CPaginationItem @click="next()" aria-label="Next" href="#"><span
                                    aria-hidden="true">&raquo;</span>
                            </CPaginationItem>
                        </CPagination>
                </CCardBody>
            </CCard>
        </CCol>
         <!-- Untuk lihat gambar  -->
         <CModal :visible="VisibleLihatGambar" @close="() => { VisibleLihatGambar = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Lihat Gambar {{ lihat_item.item_nama }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <p><a :href=imageUrl>Link</a></p>
                <CImage rounded thumbnail :src=imageUrl width="200" height="200" />
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { VisibleLihatGambar = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
        <!-- Untuk update gambar  -->
        <CModal :visible="VisibleUpdateImage" @close="() => { VisibleUpdateImage = false }"
            aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Update Gambar {{ detail_item.item_nama }}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm class="row g-4">
                    <div class="col-auto">
                        <CFormInput type="text" value="Nama Barang" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Nama" v-model="detail_item.item_nama" readonly />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="No Husble" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="No" v-model="detail_item.item_husble" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="Gambar Item" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="file" id="inputGroupFile02" @change="handleFileChange" />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="primary" @click="UploadGambar()">Upload</CButton>
                <CButton color="secondary" @click="() => { VisibleUpdateImage = false }">
                    Tutup
                </CButton>
            </CModalFooter>
        </CModal>
    </CRow></template>
<script src="./Service/data_item_meter.jsx"></script>
  