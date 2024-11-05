const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated User:', req.user);
    // Redirect to the frontend upon successful authentication
    res.redirect('https://googleoauth2.netlify.app/dashboard'); // Update as necessary
  }
);

  router.get('/user', (req, res) => {
    if (req.user) {
      res.json(req.user); // Return user details if authenticated
    } else {
      res.status(401).json({ message: 'Unauthorized' }); // Return 401 if not authenticated
    }
  });


  router.get('/logout', (req, res) => {
    req.logout(function(err) { // Add callback here to handle logout
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out' });
            }
            res.json({ message: 'Logged out successfully' });
        });
    });
});


module.exports = router;
