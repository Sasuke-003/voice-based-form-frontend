const { user, auth } = require( './validator.config.js' ) ;

const validator = {

    "/user/login"  : user.login,
    "/user/logout" : user.logout,
    "/user/signup" : user.signup,


    "/auth/refresh-token" : auth.refreshToken,
    "/auth/access-token"  : auth.accessToken,
    
    } ;
    
    export const validate = async ( req ) => {
        try           { await validator[ req.url ].validateAsync( req.data ) ; return req ; }
        catch ( err ) { alert ( err.details[0].message ); throw err  ;       }
    }