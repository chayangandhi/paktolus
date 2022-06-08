const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('../users.json');
const passport = require('passport')
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    let userExist = users.find(item=>item.username == jwt_payload.username)
    if(!userExist){
        return done(false);
    }
    if(userExist) return done(null, userExist)
}));