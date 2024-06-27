i
<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ data_item }}</strong>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>Keperluan / Nama Pelanggan</CFormLabel>
                  <CFormInput type="text" v-model="tambah_data.Tr_logistic_keluar_keperluan" />
                </div>
              </CCol>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>No.Transaksi {{ HitungyangTerpakai }}</CFormLabel>
                  <CFormInput type="text" v-model="NomorTransaksi" readonly />
                </div>
              </CCol>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>Nomor Husble</CFormLabel>
                  <CFormInput type="text" v-model="NomorHusble.item_husble" readonly />
                </div>
              </CCol>
              <CCol xs="3">
                &nbsp; &nbsp;

                <CInputGroup class="mb-3">
                  <CInputGroupText as="label" for="inputGroupSelect01"
                    >Kategori Penarikan</CInputGroupText
                  >
                  <CFormSelect
                    aria-label="Default select example"
                    id="inputGroupSelect01"
                    v-model="tambah_data.Tr_logistic_keluar_kategori_keperluan"
                  >
                    <option value="Jalur">Jalur</option>
                    <option value="PSB">PSB</option>
                    <option value="Maintenance">Maintenance</option>
                  </CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>SN.ONT</CFormLabel>
                  <CFormInput type="text" v-model="tambah_data.Tr_logistic_keluar_sn" />
                </div>
              </CCol>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>Type.ONT</CFormLabel>
                  <CFormInput type="text" v-model="tambah_data.Tr_logistic_keluar_type_ont" />
                </div>
              </CCol>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>TANGGAL</CFormLabel>
                  <!-- <CFormInput type="date" v-model="tambah_data.Tr_logistic_keluar_tanggal" /> -->
                  <input type="date" class="form-control" v-model="form_khusus_tanggal" />
                </div>
              </CCol>
              <CCol xs="3">
                <div class="mb-3">
                  <CFormLabel>Panjang Kabel</CFormLabel>
                  <CFormInput type="number" v-model="tambah_data.Tr_logistic_keluar_total" />
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12">
                <div class="mb-3">
                  <CFormLabel>Alamat</CFormLabel>
                  <CFormTextarea v-model="tambah_data.Tr_logistic_keluar_alamat"></CFormTextarea>
                </div>
              </CCol>
            </CRow>
            <CButton color="primary" @click.prevent="CreateData">Simpan</CButton>
            &nbsp;
            <router-link :to="{ name: 'Kabel' }" tag="button" color="secondary">
              <CButton color="secondary">Kembali</CButton>
            </router-link>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ data_item2 }}</strong>
        </CCardHeader>
        <CCardBody>
          <CButton color="primary" role="button" @click.prevent="addItem">Tambah</CButton>
          &nbsp;
          <CButton color="danger" role="button" @click.prevent="removeItem(1)">kurangi</CButton>
          &nbsp;
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">No</CTableHeaderCell>
                <CTableHeaderCell scope="col">Nama.Pegawai</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="(items, index) in formArray" :key="index">
                <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
                <CTableDataCell>
                  <CFormInput type="text" v-model="items.Tr_logistic_keluar_list_pegawai" />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script src="./Service/create_input_kabel"></script>
