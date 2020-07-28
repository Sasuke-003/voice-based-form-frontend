const { user } = require( './validator.config.js' ) ;

const validator = {

    "/user/sign-up" : user.signUp,
    "/user/sign-in" : user.signIn,
    
    } ;
    
export const validate = async ( req ) => {
    try { 
        if( req.method === 'post' ) await validator[ req.url ].validateAsync( req.data ) ; 
        return req ;
    } catch ( err ) { 
        alert ( err.details[0].message ); throw err ; 
    }
}
