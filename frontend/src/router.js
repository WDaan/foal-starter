import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'

import Home from './views/Home.vue'

Vue.use(Router)
Vue.use(VueCookies)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                secure: true
            },
            component: Home
        },
        {
            path: '/signin',
            name: 'signin',
            component: () =>
                import(/* webpackChunkName: "signin" */ './views/Signin.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () =>
                import(/* webpackChunkName: "signup" */ './views/Signup.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.secure) {
        const access_token = Vue.$cookies.get('token')
        if (!access_token) {
            next({ name: 'signin' })
        } else {
            next()
        }
    }
    next()
})

export default router
