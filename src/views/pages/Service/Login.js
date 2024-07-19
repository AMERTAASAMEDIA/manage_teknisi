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
                    .then((response) => {
                        // console.log(this.errorMessage)
                        // if (this.$store.getters.Auth_role === 'KOORDINATOR') {
                        //     // this.$router.push('/dashboard');
                        //     this.$swal('Selamat Datang ' + this.$store.getters.Auth_data.Auth_email, 'Dashboard', 'success');
                        //     // this.$router.push('/dashboard');
                        // } else {
                        //     this.$swal('Maaf ' + this.$store.getters.Auth_data.Auth_email, 'Anda bukan Divisi Logistik', 'error');
                        // }
                        // console.log("Hallo")
                        // console.log(this.$store.getters.Auth_role)
                        this.$router.push('/dashboard');
                    })
            } catch (error) {
                this.errorMessage = error.message
            }
        }
    }
}