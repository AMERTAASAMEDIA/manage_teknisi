<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Laporan Aset</strong> <small></small> </CCardHeader>
        <CCardBody>
          <CRow class="mb-6">
            <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
            <div class="col-sm-5">
              <!-- <CButton as="a" color="primary" href="#" role="button">Tambah Data</CButton> -->
              <CFormInput type="text" v-model="cari" />
              &nbsp; &nbsp;
            </div>
          </CRow>
          <!-- <DocsExample href="components/table.html#bordered-tables"> -->
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Material</CTableHeaderCell>
                <CTableHeaderCell scope="col">Stok</CTableHeaderCell>
                <CTableHeaderCell scope="col">Harga</CTableHeaderCell>
                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(items, index) in FilterPost" :key="items._id">
                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                <CTableDataCell>{{ items.item_nama }}</CTableDataCell>
                <CTableDataCell>{{ items.item_stok }}</CTableDataCell>
                <CTableDataCell>{{ formatCurrency(parseFloat(items.item_harga)) }}</CTableDataCell>
                <CTableDataCell>{{
                  formatCurrency(parseFloat(items.item_stok * items.item_harga))
                }}</CTableDataCell>
              </CTableRow>
            </CTableBody>
            <CTableFoot>
              <CTableRow>
                <CTableHeaderCell colspan="3" style="text-align: center;">Total</CTableHeaderCell>
                <CTableHeaderCell colspan="2" style="text-align: center;">{{ formatCurrency(TotalAll) }}</CTableHeaderCell>
              </CTableRow>
            </CTableFoot>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
    <!-- Untuk lihat gambar  -->
    <CModal
      :visible="VisibleLihatGambar"
      @close="
        () => {
          VisibleLihatGambar = false
        }
      "
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Lihat Gambar {{ lihat_item.item_nama }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p><a :href="imageUrl">Link</a></p>
        <CImage rounded thumbnail :src="imageUrl" width="200" height="200" />
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          @click="
            () => {
              VisibleLihatGambar = false
            }
          "
        >
          Tutup
        </CButton>
      </CModalFooter>
    </CModal>
    <!-- Untuk update gambar  -->
  </CRow>
</template>
<script src="./Service/laporan_aset.jsx"></script>
