const User = require('../../models/User');
const bcrypt = require('bcryptjs');
import config from '../../config';
const { generateAccessToken } = require('../../utils/token');
const { getGoogleOauthToken, getGoogleUser } = require('../../services/session.service');

class AuthGoogleController {
  async googleOauthHandler (req, res) {
    try {
      // Get the code from the query
      const code = req.query.code as string;
      const pathUrl = (req.query.state as string) || '/';
  
      if (!code) {
        return res.status(401).json({message: 'Authorization code not provided!'})
      }
  
      
      // Use the code to get the id and access tokens
      const { id_token, access_token } = await getGoogleOauthToken({ code });

      console.log({ id_token, access_token });
      
  
      // Use the token to get the User
      const { name, verified_email, email, picture } = await getGoogleUser({
        id_token,
        access_token,
      });

      console.log('g user', { name, verified_email, email, picture });
      
  
      // Check if user is verified
      if (!verified_email) {
        return res.status(403).json({message: 'Google account not verified'})
      }
  
      // Update user if user already exist or create new user
      const user = await User.findOneAndUpdate(
        { email },
        {
          name,
          password : await bcrypt.hash(config.PASS_SECRET, 10),
          email,
          provider: 'Google',
        },
        { upsert: true, runValidators: false, new: true, lean: true }
      );

      console.log('app user', user);
      
  
      if (!user) {
        return res.redirect(`${config.FRONT_URL}/oauth/error`);
      }
        
  
      const token = generateAccessToken(user);
      console.log('hery good');
      
      return res.redirect(`${config.FRONT_URL}/oauth/google?token=${token}&user=${JSON.stringify(user)}`);
      
    } catch (err: any) {
      console.log('Failed to authorize Google User', err);
      return res.redirect(`${config.FRONT_URL}/oauth/error`);
    }
  }
}

module.exports = new AuthGoogleController