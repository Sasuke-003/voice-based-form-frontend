const Joi = require( '@hapi/joi' ) ;

//////////////////////////////////////////////
// Min - Max
const userSchema = {
    email    : Joi.string().trim().min( 1 ).max( 50 ).required(),
    pass     : Joi.string().trim().min( 1 ).max( 50 ).required(),
    fullName : Joi.string().trim().min( 1 ).max( 50 ).required(),
    type     : Joi.string().trim().min( 1 ).max( 1  ).required(),
} ;


// ---------- User ---------- //
module.exports.user = {
    
    login : Joi.object({
        Email    : userSchema.email,
        Password : userSchema.pass,
    }),

    logout : Joi.forbidden(),

    signup : Joi.object({
        FullName : userSchema.fullName,
        Email    : userSchema.email,
        Password : userSchema.pass,
        Type     : userSchema.type,
    }),

} ;


module.exports.auth = {
    refreshToken : Joi.forbidden(),
    accessToken  : Joi.forbidden(),
} ;
