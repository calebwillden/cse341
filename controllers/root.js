const connect = require('../db/connect.js');

const getName = async (req, res) => {
    res.send('Caleb Willden');
};

const testDatabase = async (req, res) => {
    res.send(connect());
};

module.exports = { getName, testDatabase };
