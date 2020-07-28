const { user, form } = require( './validator.config.js' ) ;

const validator = {

    "/user/sign-up" : user.signUp,
    "/user/sign-in" : user.signIn,
    
    "/form/template/new" : form.template.new,

    "/form/ans/new"      : form.ans.new,

    } ;
    
export const validate = async ( req ) => {
    try { 
        if( req.method === 'post' ) await validator[ req.url ].validateAsync( req.data ) ; 
        return req ;
    } catch ( err ) { 
        alert ( err.details[0].message ); throw err ; 
    }
}
