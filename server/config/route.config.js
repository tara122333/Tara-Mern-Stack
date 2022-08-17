import JwtPassport from "passport-jwt";
import { UserModel } from "../database";
// import dotenv from "dotenv";
// dotenv.config({
//   path: require("path").resolve(__dirname, "../.env"),
// });

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'zomatoUser';

export default (passport) => {
  passport.use(
    new JWTStratergy(opts, async (jwt__payload /* it is data */, done) => {
      try {
        console.log(jwt__payload.user); // done
        const doesUserExist = await UserModel.findOne({_id : jwt__payload.user});
        console.log(doesUserExist); //done
        if (!doesUserExist) return done(null, false);
        return done(null, doesUserExist);
      } catch (error) {
        throw new Error(error);
      }
    })
  );
  passport.serializeUser((userData,done)=> done(null,{...userData}));
  passport.deserializeUser((id,done)=>done(null,id));
};
