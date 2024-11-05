const crypto = require('crypto');

// Generate a secure random string
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey); // Log the secret key
