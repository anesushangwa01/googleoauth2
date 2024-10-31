const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // User info will be available in req.user if authentication is successful
      console.log('Authenticated User:', req.user);  // Display user info in console
      
      // Send user info as JSON response
      res.json({
        message: 'User authenticated successfully',
        user: req.user
      });
    }
  );

module.exports = router;
