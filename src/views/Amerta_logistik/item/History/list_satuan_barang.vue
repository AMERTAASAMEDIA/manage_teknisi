<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel</strong> <small>{{ data_item }}</small>
                </CCardHeader>
                <CCardBody>
                    <p class="text-body-secondary small">
                       LIST BARANG YANG SUDAH DIKODE SN
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
                                    <CTableHeaderCell scope="col">KODE SN</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Status Pemakaian</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                                    <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                    <CTableDataCell>{{ items.item_list_nama }}</CTableDataCell>
                                    <CTableDataCell>{{ items.item_list_kode_sn }}</CTableDataCell>
                                    <CTableDataCell v-if="items.item_list_status_pemakaian === 'N'">Belum Dipakai
                                    </CTableDataCell>
                                    <CTableDataCell v-if="items.item_list_status_pemakaian === 'Y'">Dipakai</CTableDataCell>
                                    <CTableDataCell>{{ formatCurrency(parseFloat(items.item_list_harga)) }}</CTableDataCell>
                                    <CTableDataCell>
                                        <CDropdown>
                                            <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                            <CDropdownMenu>
                                                <!-- <CDropdownItem @click="detaildata(items)">Detail</CDropdownItem> -->
                                                <!-- <router-link :to="{name:'detail_closing',params:{id:closing.id , domain : closing.closing_domain}}"><i class="icon wb-share" aria-hidden="true"></i>Detail</router-link> -->
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'HistoryPemakaianList', params: { id: items._id } }">History
                                                        Pemakaian</router-link>
                                                </CDropdownItem>
                                                <CDropdownItem v-if="items.item_list_status_pemakaian === 'N'"><router-link
                                                        style="text-decoration: none"
                                                        :to="{ name: 'AlokasiBarang', params: { id: items._id } }">Transaksi</router-link>
                                                </CDropdownItem>
                                                <CDropdownItem v-if="items.item_list_status_pemakaian === 'Y'">
                                                    <a color="primary" role="button" @click="reinput(items._id)">Re-Input barang
                                                    </a>
                                                </CDropdownItem>
                                                <CDropdownItem><router-link style="text-decoration: none"
                                                        :to="{ name: 'HistoryPembelian', params: { id: items._id } }">Tahap
                                                        QC(COMING SOON)</router-link>
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
</CRow></template>
<script src="./Service/list_satuan_barang.jsx"></script>
  