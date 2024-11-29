const crypto = require('crypto');
const fs = require('fs');

const secret = crypto.randomBytes(32).toString('hex');

fs.writeFileSync('private.key', secret);