
// exports const myMutations =  ( state ) => {

// }

export const loginUser =  ( state, { user, idToken, refreshToken} ) => {

    if( idToken ){
        localStorage.setItem('idToken', idToken)
        state.idToken = idToken
    }

    if( refreshToken ){
        localStorage.setItem('refreshToken', refreshToken)
        state.refreshToken = refreshToken
    }

    state.user = user
    state.status = 'authenticated'

}

export const logout = (state)  => {
    // Purgar la Información
    state.user = null
    state.idToken = null
    state.refreshToken = null
    state.status = 'not-authenticated'

    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
}