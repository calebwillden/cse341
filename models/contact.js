const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    favoriteColor: { type: String, required: true },
    birthday: { type: Date, required: true },
});

const ContactModel = mongoose.model('contact', ContactSchema);

module.exports = ContactModel;
