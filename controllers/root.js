const mongoose = require('mongoose');

const getName = async (req, res) => {
    res.send('Caleb Willden');
};

module.exports = { getName };
