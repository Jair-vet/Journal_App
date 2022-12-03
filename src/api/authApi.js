
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyADCTbdzXAjwdQi7YbsQOygqEknITHznoc'
    }
})


export default authApi