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
                        this.$swal('Selamat Datang', 'Dashboard', 'success');
                        this.$router.push('/')
                    })
            } catch (error) {
                this.errorMessage = error.message
            }
        }
    }
}