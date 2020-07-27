import axios from 'axios'

export const URL = {

    login  : '/user/login',
    signup : '/user/signup',


}


export const req = {

    user: {

        login   : async (data) => { return await axios.post( URL.login, data ) },
        signup  : async (data) => { return await axios.post( URL.signup, data ) },

    },

    


}