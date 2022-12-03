import { useStore } from "vuex"


const useAuth = () => {

    const store = useStore()

    const createUser = async( user ) => {
        console.log(user);

        // store.dispatch('auth/createUser', user)
        // return resp
    }



    return {
        createUser,
    }

}

export default useAuth