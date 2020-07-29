import axios from 'axios'

export const URL = {

    signUp  : '/user/sign-up' ,
    signIn  : '/user/sign-in' ,
    signOut : '/user/sign-out',

    formCreate : '/form/template/new',
    formDetail : '/form/template/detail/'

}


export const req = {

    user: {

        signUp  : async (data) => { return await axios.post( URL.signUp, data ) },
        signIn  : async (data) => { return await axios.post( URL.signIn, data ) },
        signOut : async () => { return await await axios.get( URL.signOut ) }

    },

    form: {

        create : async ( data ) => { return await axios.post( URL.formCreate, data ) },
        detail : async ( data ) => { return await axios.post( URL.formDetail+data ) }

    },
    


}