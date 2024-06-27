import { Strategy as LocalStrategy } from 'passport-local';
import { getUser } from '../../services/authService.js';
import passport from 'passport';

passport.use(new LocalStrategy({session: false }, async (email, password, done) => {
  try {
      const user = await getUser(email);
      if (!user) {
        return done(null, false, { message: 'email or password invalid' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'email or password invalid' });
      }

      delete user.password;
      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

  