import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { getUser } from '../../services/authService.js';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
      const user = await getUser(email);
      if (!user) {
        return done(null, false, { message: 'User or password incorrect' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'User or password incorrect' });
      }
      
      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

export default passport;

  