import axios from 'axios' ;
import moment from 'moment'
import { store } from '../redux/store' ;
import { setCurrentUser } from '../redux/user/user.actions' ;

export const URL = {

    signUp  : '/user/sign-up' ,
    signIn  : '/user/sign-in' ,
    signOut : '/user/sign-out',

    formCreate : '/form/template/new',
    formDetail : '/form/template/detail/',
    formAnswer : '/form/ans/new',
    formList   : '/form/template/list/',
    
    /////////////////////////////////////
    refreshToken : '/auth/refresh-token',
    accessToken  : '/auth/access-token',
}


export const req = {

    user: {

        signUp  : async (body) => { return await axios.post( URL.signUp, body ) },
        signIn  : async (body) => {
            localStorage.setItem( "nextRefreshTime" , moment().add(1,'days') );
            const resData = await axios.post( URL.signIn, body );
            axios.defaults.headers.common['Authorization'] = resData.AccessToken;
            return resData;
        },
        signOut : async ( ) => { 
            axios.get( URL.signOut ); 
            localStorage.clear();
            // Clears all Cookie  ( From : https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript )
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            store.dispatch(setCurrentUser(null));
        }
    },

    form: {

        create : async ( body  ) => { return await axios.post( URL.formCreate, body ) },
        detail : async ( param ) => { console.log(URL.formDetail+param); return await axios.get( URL.formDetail+param ) },
        answer : async ( data ) => { return await axios.post( URL.formAnswer, data ) },
        list : async ( data ) => { return await axios.get( URL.formList+data ) },

    },

    auth : {
        refreshToken : async () => {
            if ( moment(localStorage.getItem( "nextRefreshTime" )) < moment() ) {
                localStorage.setItem( "nextRefreshTime" , moment().add(1,'days') )
                const res = await axios.get( URL.refreshToken );
                axios.defaults.headers.common['Authorization'] = res.AccessToken ;
            }
        },
        accessToken : async ( failedReq ) => {
            const res = await axios.get( URL.accessToken );
            axios.defaults.headers.common['Authorization'] = res.AccessToken ;

            if ( failedReq ) {
                failedReq.headers[ 'Authorization']  = res.AccessToken ;
                failedReq.data = JSON.parse( `${failedReq.data}` ) ;
                return await axios.request( failedReq ) ; 
            }
            return res;
        },
    }
}
