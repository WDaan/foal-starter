<template>
    <div class="box signin">
        <h1>Sign Up</h1>
        <form action="#" @submit.prevent="signup">
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
                    <label for="firstname">Firstname</label>
                </div>
                <div>
                    <input
                        type="text"
                        class="text-input"
                        id="firstname"
                        name="firstname"
                        v-model="firstname"
                        placeholder="Firstname"
                    />
                </div>
            </div>
            <div class="form-group">
                <div>
                    <label for="lastname">Lastname</label>
                </div>
                <div>
                    <input
                        type="text"
                        class="text-input"
                        id="lastname"
                        name="lastname"
                        v-model="lastname"
                        placeholder="Lastname"
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
                <input type="submit" value="Sign up" class="btn" />
            </div>
        </form>
        <div class="btn-wrapper text-center">
            <router-link class="btn btn-orange btn-sm" to="/signin"
                >Sign in</router-link
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
        password: null,
        firstname: null,
        lastname: null
    }),
    methods: {
        signup(e) {
            e.preventDefault()

            this.$store
                .dispatch('SIGNUP', {
                    email: this.email,
                    password: this.password,
                    firstname: this.firstname,
                    lastname: this.lastname
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
