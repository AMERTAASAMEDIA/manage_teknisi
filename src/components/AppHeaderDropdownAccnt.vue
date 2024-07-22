<script setup>
import avatar from '@/assets/images/avatars/8.jpg';
const itemsCount = 42
</script>
<script>
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['logout']),
    async Logout() {
      this.logout().then(() => {
        this.$swal('Goodbye', 'AAM', 'success');
        this.$router.push('/login')
      })
    }
  }
}
</script>
<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top">
        Akun
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Log Aktivitas
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Pekerjaan
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Pengaturan
      </CDropdownItem>
      <CDropdownItem @click="Logout()">
        <CIcon icon="cil-lock-locked" /> Keluar
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
