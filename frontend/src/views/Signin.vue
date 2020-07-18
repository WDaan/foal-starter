<template>
    <div class="box signin">
        <h1>Sign In</h1>
        <form action="#" @submit.prevent="login">
            <div class="form-group error text-center" v-if="error">
                {{ error }}
            </div>
            <div class="form-group">
                <div>
                    <label for="email">Email</label>
                </div>
                <div>
                    <input
                        type="email"
                        class="text-input"
                        id="email"
                        name="email"
                        v-model="email"
                        placeholder="Email"
                        required
                    />
                </div>
            </div>
            <div class="form-group">
                <div>
                    <label for="password">Password</label>
                </div>
                <div>
                    <input
                        type="password"
                        class="text-input"
                        id="password"
                        name="password"
                        v-model="password"
                        placeholder="Password"
                        required
                    />
                </div>
            </div>
            <div class="btn-wrapper text-center mb-10">
                <input type="submit" value="Log in" class="btn" />
            </div>
        </form>
        <div class="btn-wrapper text-center">
            <router-link class="btn btn-orange btn-sm" to="/signup"
                >Sign Up</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signin',
    data: () => ({
        error: null,
        email: null,
        password: null
    }),
    methods: {
        login(e) {
            e.preventDefault()

            this.$store
                .dispatch('LOGIN', {
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    this.$toast.success(res.data.message)
                    this.$router.push({ name: 'home' })
                })
                .catch(err => {
                    this.error = err.response.data.message
                })
        }
    }
}
</script>

<style></style>
