import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    Auth_data: localStorage.getItem('Auth_data') || '',
    Auth_role: localStorage.getItem('Auth_role') || '',

    isAuthenticated: false
  },
  mutations: {
    SET_AUTH_DATA(state, Auth_data) {
      state.Auth_data = Auth_data
      state.isAuthenticated = true;
    },
    SET_AUTH_ROLE(state,Auth_role){
      state.Auth_role = Auth_role
    },
    LOGOUT(state) {
      state.Auth_data = '';
      state.isAuthenticated = false;
    }
  },
  actions: {
    async login({ commit }, user) {
      try {
        const response = await axios.post('http://localhost:4000/api/Auth/login', user
        );
        localStorage.setItem('Auth_data', response.data.data)
        localStorage.setItem('Auth_role', response.data.data.Auth_role)
        commit('SET_AUTH_ROLE', response.data.data.Auth_role)
        commit('SET_AUTH_DATA', response.data.data)

      } catch (error) {
        throw new Error(error.response.data.message || 'An error occurred');
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('http://localhost:4000/api/Auth/login');
        commit('LOGOUT');
      } catch (error) {
        throw new Error('Logout failed');
      }
    }
  },
  getters: {
    Auth_data: state => state.Auth_data,
    isAuthenticated: state => !!state.Auth_data,
    Auth_role: state => state.Auth_role
  }
});