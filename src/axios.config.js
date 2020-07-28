import axios from 'axios' ;
import { validate } from './validator.js' ;
import { store } from './redux/store'
import { setCurrentUser } from './redux/user/user.actions';

let ReqID = 0  // --deb
axios.defaults.baseURL = 'http://localhost:9999' ;
axios.defaults.withCredentials = true

axios.interceptors.request.use( async req => {
    console.warn( `Request : ${( ++ReqID )}, url : ${req.url}` ) ; //-deb 
    console.log( req.data  ) ;    //-deb
    req.ResID = ReqID ; //-deb
        return await validate( req ) ;
    }, err =>  {
        return Promise.reject( err );
    });

axios.interceptors.response.use( 
    res => {
        console.warn( `Response : ${( res.config.ResID )}, url : ${res.config.url}` ) ; //-deb 
        console.log( res.data ) ; //-deb
        return res.data.data ;
    },
    async err =>  {
        console.warn( `Response Error : ${ err.config.ResID } : ${ err.config.url }` ) ; //-deb
        console.log( err.response.data  ) ; //-deb
        switch ( err.response.data.code ) {
            case 2 :    // Token Invalid
            case 9 : {  // Refresh Token Expired
                // Code to Log out 
                // ...
                store.dispatch(setCurrentUser(null));
                axios.get( '/user/sign-out' ) ;
                console.log( 'Logging Out') ; //-deb
                return Promise.reject( err ) ;
            }
            case 8 : { // Access Token Expired - Get new Access Token And Retry
                err.config.data = JSON.parse( `${err.config.data}`  ) ; 
                return await newAccessTokenAndRetry( err.config) ;
            }
            default : {
                if ( err.response.data.info )alert( err.response.data.info ) ;
                return Promise.reject( err.response.data  ) ;
            }
        }
    });
const newAccessToken = async () => {
    const res = await axios.get( '/auth/access-token' ) ;
    axios.defaults.headers.common['Authorization'] = res.AccessToken ;
    return res.AccessToken ;
}
const newAccessTokenAndRetry = async prevReq => {
    try {
        console.log( prevReq.headers )
        prevReq.headers[ 'Authorization']  = await newAccessToken() ;
        return await axios.request( prevReq ) ;
    } catch ( err ) {
        console.log( 'caught') //-deb
        throw err ;
    }
}

// New Token On Refresh
axios.get( '/auth/refresh-token' )
    .then( res => { 
        console.log( 'Token Verified - Logging In User' ) ;
        axios.defaults.headers.common['Authorization'] = res.AccessToken ;
        // Code Redirecting To Home Page 
        // ..
    })
    .catch( err => {
        console.log( 'Token Error - Redirecting To Sign In Page' ) ;
    }) ;