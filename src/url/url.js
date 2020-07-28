import axios from 'axios'

export const URL = {

    signUp  : '/user/sign-up' ,
    signIn  : '/user/sign-in' ,
    signOut : '/user/sign-out',

}


export const req = {

    user: {

        signUp : async (data) => { return await axios.post( URL.signUp, data ) },
        signIn : async (data) => { return await axios.post( URL.signIn, data ) },

    },

    


}