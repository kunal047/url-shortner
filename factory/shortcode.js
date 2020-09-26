const RandExp = require('randexp');
// ^[0-9a-zA-Z_]{4,}$
const shortCode = () => {
    return new RandExp('^[0-9a-zA-Z_]{4,}$').gen();
};

module.exports = { shortCode };
