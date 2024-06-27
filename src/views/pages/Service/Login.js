import Axios from "axios";
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: '',
            errorMessage: "",
        }
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            try {
                let email = this.email;
                let password = this.password
                await this.login({ email, password })
                    .then(() => {
                        if (this.$store.getters.Auth_role === 'LOGISTIK') {
                            this.$swal('Selamat Datang ' + this.$store.getters.Auth_data.Auth_email, 'Dashboard', 'success');
                            this.$router.push('/dashboard');
                        } else {
                            this.$swal('Maaf ' + this.$store.getters.Auth_data.Auth_email, 'Anda bukan Divisi Logistik', 'error');
                        }
                    })
            } catch (error) {
                this.errorMessage = error.message
            }
        }
    }
}