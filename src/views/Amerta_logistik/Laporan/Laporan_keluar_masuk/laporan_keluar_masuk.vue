<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Tabel</strong> <small>{{ data_item }}</small>
        </CCardHeader>
        <CCardBody>
          <div class="col-sm-5">
            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
            <CFormInput type="date" v-model="cari" placeholder="Cari" />
            <p></p>
            <CButton color="primary" role="button" @click="getdata()">Cari </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12" v-show="VisibleTable">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ data_item }}</strong> <small>#</small>
        </CCardHeader>
        <CCardBody>
          <CRow class="mb-6">
            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
          </CRow>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" rowspan="3" colspan="2">#</CTableHeaderCell>
                <!-- <CTableHeaderCell scope="col"> #</CTableHeaderCell> -->
                <CTableHeaderCell scope="col" colspan="3" style="text-align: center"
                  >Masuk
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" colspan="3" style="text-align: center"
                  >Aset
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" rowspan="2">No</CTableHeaderCell>
                <CTableHeaderCell scope="col" rowspan="2">Nama Barang</CTableHeaderCell>
                <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total</CTableHeaderCell>

                <CTableHeaderCell scope="col" style="text-align: center">Total</CTableHeaderCell>
                <!-- <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Total</CTableHeaderCell> -->
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(items, index) in list_item" :key="items._id">
                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                <CTableDataCell>{{ items.Tr_detail_logistic_nama_barang }}</CTableDataCell>
                <!-- Masuk  -->
                <CTableDataCell>{{ items.Tr_detail_logistic_jumlah_barang }}</CTableDataCell>
                <CTableDataCell>{{
                  formatCurrency(parseFloat(items.Tr_detail_logistic_harga_barang))
                }}</CTableDataCell>
                <CTableDataCell>{{
                  formatCurrency(
                    parseFloat(
                      items.Tr_detail_logistic_harga_barang *
                        items.Tr_detail_logistic_jumlah_barang,
                    ),
                  )
                }}</CTableDataCell>
                <!-- Aset  -->
                
                <!-- <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga)) }}</CTableDataCell> -->
                <!-- <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga * items.item_stok)) }}</CTableDataCell> -->
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script src="./Service/laporan_keluar_masuk.jsx"></script>
