<template>
    <nav class="navbar bg-primary notprocessed">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" 
                 alt="Vue Logo"
                 height="25"
                 class="d-inline-block align-text-top mx-3">

                 {{ username }}
        </a>

        <div class="d-flex">
            <button class="btn btn-outline-info1 mx-3"
                @click="onLogout">
                <i class="fa fa-sign-out-alt"></i>
            </button>
        </div>
    </nav>
</template>

<script>
import useAuth from '@/modules/auth/composable/useAuth'
import {  useRouter } from 'vue-router'

export default {
    setup() {

        const router = useRouter()
        const { username, logout } = useAuth()


        return {
            username,
            onLogout: () => {
                router.push({ name: 'login' })
                logout()  
            }
        }

    }
}

</script>