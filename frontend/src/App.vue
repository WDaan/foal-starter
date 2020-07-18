<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
    name: 'App',
    components: {
        Navbar
    },
    created() {
        const token = this.$cookies.get('token')
        if (token) {
            this.$store.commit('SET_AUTH', { token })
        }
    }
}
</script>

<style>
@import './assets/styles.css';
#app {
    height: 100%;
}
</style>
