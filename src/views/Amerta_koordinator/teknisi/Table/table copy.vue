<template>
    <CRow>
        <CCol :xs="12">
            <CCard class="mb-4">
                <CCardHeader>
                    <strong>Tabel Teknisi</strong> <small>{{ data_item }}</small>
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
                            <CButton color="primary" role="button" @click="() => { Visibletambahdata = true }">Tambah Data</CButton>
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
                                <CTableHeaderCell scope="col">Domain</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Alamat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col">No Telepon</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Detail Identitas</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal Pemasangan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal Dibuat</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tanggal Diupdate</CTableHeaderCell>
                                <CTableHeaderCell scope="col">User Diupdate</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tipe Pelanggan</CTableHeaderCell>
                                <CTableHeaderCell scope="col">PIC PSB</CTableHeaderCell>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            <CTableRow v-for="(item, index) in FilterPost" :key="item.master_pengguna_id">
                                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                                <CTableDataCell>{{ item.master_pengguna_nama }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_id }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_domain }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_status }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_alamat }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_role }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_no_telepon }}</CTableDataCell>
                                <CTableDataCell>
                                    KTP: {{ item.master_pengguna_detail_identitas.master_pengguna_detail_identitas_ktp }}, 
                                    NPWP: {{ item.master_pengguna_detail_identitas.master_pengguna_detail_identitas_npwp }}
                                </CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_tanggal_pemasangan }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_created }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_updated }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_user_updated }}</CTableDataCell>
                                <CTableDataCell>{{ item.master_pengguna_tipe_pelanggan }}</CTableDataCell>
                                <CTableDataCell>
                                    <ul>
                                        <li v-for="pic in item.master_pengguna_pic_psb" :key="pic">{{ pic }}</li>
                                    </ul>
                                </CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Aksi</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem @click="detaildatateknisi(item)">Detail</CDropdownItem>
                                            <CDropdownItem><router-link :to="{name:'EditTechnician', params:{id: item.master_pengguna_id}}">Edit</router-link></CDropdownItem>
                                            <CDropdownItem @click="hapusteknisi(item.master_pengguna_id)">Hapus</CDropdownItem>
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
        <!-- modal tambah data -->
        <CModal :visible="Visibletambahdata" @close="() => { Visibletambahdata = false }" aria-labelledby="LiveDemoExampleLabel">
            <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Tambahkan Teknisi</CModalTitle>
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
                    <!-- Domain -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Domain" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Domain" v-model="data.master_pengguna_domain" />
                    </div>
                    <!-- Status -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Status" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormSelect aria-label="Default select example" v-model="data.master_pengguna_status">
                            <option value="Y">Y</option>
                        </CFormSelect>
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
                        <CFormInput type="text" placeholder="KTP" v-model="data.master_pengguna_detail_identitas.ktp" />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" value="NPWP" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="NPWP" v-model="data.master_pengguna_detail_identitas.npwp" />
                    </div>
                    <!-- Tanggal Pemasangan -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Tanggal Pemasangan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Tanggal Pemasangan" v-model="data.master_pengguna_tanggal_pemasangan" />
                    </div>
                    <!-- Tanggal Dibuat -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Tanggal Dibuat" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Tanggal Dibuat" v-model="data.master_pengguna_created" />
                    </div>
                    <!-- Tanggal Diupdate -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Tanggal Diupdate" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="Tanggal Diupdate" v-model="data.master_pengguna_updated" />
                    </div>
                    <!-- User Diupdate -->
                    <div class="col-auto">
                        <CFormInput type="text" value="User Diupdate" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="User Diupdate" v-model="data.master_pengguna_user_updated" />
                    </div>
                    <!-- Tipe Pelanggan -->
                    <div class="col-auto">
                        <CFormInput type="text" value="Tipe Pelanggan" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormSelect aria-label="Default select example" v-model="data.master_pengguna_tipe_pelanggan">
                            <option value="personal">Personal</option>
                            <option value="corporate">Corporate</option>
                        </CFormSelect>
                    </div>
                    <!-- PIC PSB -->
                    <div class="col-auto">
                        <CFormInput type="text" value="PIC PSB" readonly plain-text />
                    </div>
                    <div class="col-auto">
                        <CFormInput type="text" placeholder="PIC PSB" v-model="data.master_pengguna_pic_psb" />
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" @click="() => { Visibletambahdata = false }">Tutup</CButton>
                <CButton color="primary" @click="submitData">Simpan</CButton>
            </CModalFooter>
        </CModal>
    </CRow>
</template>
<script src="./Service_table.jsx"></script>

