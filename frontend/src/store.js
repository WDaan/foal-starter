import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: false
    },
    getters: {
        get_token: state => () => {
            if (state.token) return state.token

            if (Vue.$cookies.get('token')) return Vue.$cookies.get('token')

            return false
        },
        get_request_headers: (state, getters) => () => {
            return {
                headers: {
                    Authorization: 'Bearer ' + getters.get_token()
                }
            }
        }
    },
    mutations: {
        SET_AUTH(state, { token }) {
            state.token = token
        }
    },
    actions: {
        LOGIN: (context, credentials) => {
            return new Promise((resolve, reject) => {
                axios
                    .post('/api/auth/login', {
                        email: credentials.email,
                        password: credentials.password
                    })
                    .then(response => {
                        const token = response.data.token
                        Vue.$cookies.set('token', token, '15min')
                        context.commit('SET_AUTH', { token })
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        LOGOUT: async context => {
            return new Promise((resolve, reject) => {
                axios
                    .post('/api/auth/logout', null, {
                        headers: {
                            Authorization:
                                'Bearer ' + context.getters.get_token()
                        }
                    })
                    .then(response => {
                        Vue.$cookies.remove('token')
                        context.commit('SET_AUTH', { token: null })
                        Vue.$toast.success(response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        SIGNUP: (context, credentials) => {
            return new Promise((resolve, reject) => {
                axios
                    .post('/api/signup', {
                        email: credentials.email,
                        password: credentials.password,
                        firstname: credentials.firstname,
                        lastname: credentials.lastname
                    })
                    .then(response => {
                        const token = response.data.token
                        Vue.$cookies.set('token', token, '15min')
                        context.commit('SET_AUTH', { token })
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})
