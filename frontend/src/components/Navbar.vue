<template>
    <nav class="navbar">
        <div v-if="auth">
            <router-link class="nav-link" to="/">Home</router-link>
            <button class="nav-link" @click="logout">Logout</button>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Navbar',
    methods: {
        logout() {
            this.$store.dispatch('LOGOUT').then(() => {
                this.$router.push({ name: 'signin' })
            })
        }
    },
    computed: {
        ...mapGetters(['get_token']),
        auth() {
            return this.get_token()
        }
    }
}
</script>

<style>
.navbar {
    display: flex;
    flex-direction: row;
    padding: 10px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 50;
    margin: 0px 40px 0px 0px;
}

.nav-link {
    text-decoration: none;
    border: none;
    background-color: inherit;
    font-size: 1.3em;
    font-weight: lighter;
    color: rgb(114, 112, 112);
    padding: 8px;
    cursor: pointer;
}

.nav-link:hover {
    text-decoration: underline;
}
</style>
