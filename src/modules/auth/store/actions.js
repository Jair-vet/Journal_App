import authApi from "@/api/authApi";

 
export const createUser = async ({ commit }, user) => {

    const { name, email, password } = user

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken, refreshToken } = data

        const resp = await authApi.post(':update', { displayName: name, idToken, refreshToken })
        
        // Hacer una mutacion  loginUser
        delete user.password // para que el password no se encuentre ahi
        commit('loginUser', { user, idToken, refreshToken})


        return { ok: true }
        
    } catch (error) {
        
        return { ok: false, message: error.response.data.error.message}
    }

}

export const signInUser = async ({ commit }, user) => {

    const { email, password } = user

    try {

        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { displayName, idToken, refreshToken } = data

        // Extraer el nombre
        user.name = displayName
        
        // Hacer una mutacion  loginUser
        commit('loginUser', { user, idToken, refreshToken})

        return { ok: true }
        
    } catch (error) {
        
        return { ok: false, message: error.response.data.error.message }
    }

}
export const checkAutentication = async ({ commit }, user) => {

    const idToken       = localStorage.getItem('idToken')
    const refreshToken  = localStorage.getItem('idToken')

    if( !idToken ){
        commit('logout')
        return { ok: false, message: 'No existe un token'}
    }

    try {
        const { data } = await authApi.post(':lookup', { idToken })
        const { displayName, email } = data.users[0]

        const user = {
            name: displayName,
            email
        }

        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }

        
    } catch (error) {
        commit('logout')
        return { ok: false,  message: error.response.data.error.message }
    }

}

