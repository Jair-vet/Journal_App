
import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-journalapp-b21c7-default-rtdb.firebaseio.com'
})


export default journalApi