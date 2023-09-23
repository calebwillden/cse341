const mongoose = require('mongoose');
const { ContactModel } = require('../models');

/*******************************************************************************
 * GET ALL CONTACTS
 ******************************************************************************/
const getAll = async (req, res) => {
    const allContacts = await ContactModel.find();
    res.send(allContacts);
};

/*******************************************************************************
 * GET CONTACT BY ID
 ******************************************************************************/
const getById = async (req, res) => {
    const contactId = req.params.id;
    const contact = await ContactModel.findById(contactId);
    res.send(contact);
};

/*******************************************************************************
* CREATE CONTACT
*******************************************************************************
Requires a body following this format:
{
    firstName: 'Caleb',
    lastName: 'Willden',
    email: 'email',
    favoriteColor: 'blue',
    birthday: '1997-04-11',
}
/*******************************************************************************/
const create = async (req, res) => {
    try {
        // Start Transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('Transaction started: Create Contact');

        // Create Contact
        const contactData = req.body;
        const contact = new ContactModel(contactData);
        await contact.save();

        // Finish Transaction
        await session.commitTransaction();
        console.log('Transaction committed: Create Contact');

        // Send a success message
        res.status(201).json({ info: 'CONTACT_CREATED' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ info: 'ERR_SERVER_ERROR' });
    }
};

module.exports = { getAll, create, getById };
