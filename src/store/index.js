import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        Auth_data: localStorage.getItem('Auth_data') || '',
        Auth_role: localStorage.getItem('Auth_role') || '',
        Auth_username: localStorage.getItem('Auth_username') || '',
        Auth_domain: localStorage.getItem('Auth_domain') || '',
        Auth_email: localStorage.getItem('Auth_email') || '',


        isAuthenticated: false
    },
    mutations: {
        SET_AUTH_DATA(state, Auth_data) {
            state.Auth_data = Auth_data
            state.isAuthenticated = true;
        },
        SET_AUTH_ROLE(state, Auth_role) {
            state.Auth_role = Auth_role
        },
        SET_AUTH_username(state, Auth_username) {
            state.Auth_username = Auth_username
        },
        SET_AUTH_domain(state, Auth_domain) {
            state.Auth_domain = Auth_domain
        },
        SET_AUTH_email(state, Auth_email) {
            state.Auth_email = Auth_email
        },
        LOGOUT(state) {
            state.Auth_data = '';
            state.isAuthenticated = false;
        }
    },
    actions: {
        async login({ commit }, user) {
            try {
                const response = await axios.post('http://77.37.47.90:4000/api/Auth/login', user);
                localStorage.setItem('Auth_data', response.data.data)
                localStorage.setItem('Auth_role', response.data.data.Auth_role)
                localStorage.setItem('Auth_username', response.data.data.Auth_username)
                localStorage.setItem('Auth_domain', response.data.data.Auth_domain)
                localStorage.setItem('Auth_email', response.data.data.Auth_email)
                commit('SET_AUTH_ROLE', response.data.data.Auth_role)
                commit('SET_AUTH_DATA', response.data.data)
                commit('SET_AUTH_username', response.data.data.Auth_username)
                commit('SET_AUTH_domain', response.data.data.Auth_domain)
                commit('SET_AUTH_email', response.data.data.Auth_email)



            } catch (error) {
                throw new Error(error.response.data.message || 'An error occurred');
            }
        },
        async logout({ commit }) {
            try {
                await axios.post('http://77.37.47.90:4000/api/Auth/login');
                commit('LOGOUT');
            } catch (error) {
                throw new Error('Logout failed');
            }
        }
    },
    getters: {
        Auth_data: state => state.Auth_data,
        isAuthenticated: state => !!state.Auth_data,
        Auth_role: state => state.Auth_role,
        Auth_username: state => state.Auth_username,
        Auth_domain: state => state.Auth_domain,
        Auth_email: state => state.Auth_email


    }
});