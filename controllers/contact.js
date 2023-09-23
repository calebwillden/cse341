const mongoose = require('mongoose');
const { ContactModel } = require('../models');

/*******************************************************************************
 * GET ALL CONTACTS
 ******************************************************************************/
const getAllContacts = async (req, res) => {
    const allContacts = await ContactModel.find();
    res.send(allContacts);
};

/*******************************************************************************
 * GET CONTACT BY ID
 ******************************************************************************/
const getContactById = async (req, res) => {
    const contactId = req.params.contactId;
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
const createContact = async (req, res) => {
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

module.exports = { getAllContacts, createContact, getContactById };
