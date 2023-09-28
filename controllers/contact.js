const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { ContactModel } = require('../models');

/*******************************************************************************
 * GET ALL CONTACTS
 * /contacts
 ******************************************************************************/
const getAllContacts = async (req, res) => {
    const allContacts = await ContactModel.find();
    res.send(allContacts);
};

/*******************************************************************************
 * GET CONTACT BY ID
 * /contacts/:id
 ******************************************************************************/
const getContactById = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const contact = await ContactModel.find({ _id: id });
    res.send(contact);
};

/*******************************************************************************
* CREATE CONTACT
*******************************************************************************
* /contacts
* Requires a body following this format:
* {
*    firstName: 'Caleb',
*    lastName: 'Willden',
*    email: 'email',
*    favoriteColor: 'blue',
*    birthday: '1997-04-11',
* }
/*******************************************************************************/
const createContact = async (req, res) => {
    try {
        // Start Transaction
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('Transaction started: CREATE CONTACT');

        // TODO: Implement transactions in all CRUD operations.
        // Also need to properly close or abort the transaction...

        // Ensure all data is present
        // TODO: Throw error based on which is missing, and
        // have that included in the response instead of a
        // generic error.
        const contactData = req.body;
        if (
            !contactData.firstName ||
            !contactData.lastName ||
            !contactData.email ||
            !contactData.favoriteColor ||
            !contactData.birthday
        ) {
            throw 'ERR_MISSING_FIELD';
        }

        // Create Contact
        const contact = new ContactModel(contactData);
        await contact.save();

        // Finish Transaction
        await session.commitTransaction();
        console.log('Transaction committed.');

        // Send a success message
        res.status(201).json({
            info: 'CONTACT_CREATED',
            contactId: contactData._id,
        });
    } catch (err) {
        console.log(`Transaction aborted. ERROR:\n${err}`);
        res.status(500).json({ info: 'ERR_SERVER_ERROR' });
    }
};

/*******************************************************************************
 * UPDATE CONTACT
 *******************************************************************************
 * /contacts/:id
 * Body JSON format example:
 * {
 *    firstName: 'Caleb',
 *    lastName: 'Willden',
 *    email: 'email',
 *    favoriteColor: 'blue',
 *    birthday: '1997-04-11',
 * }
 ******************************************************************************/
const updateContact = async (req, res) => {
    try {
        console.log('Updating Contact...');

        // Get update data from body and ID from URL
        const contactData = req.body;
        const contactId = req.params.id;

        // Update Contact
        await ContactModel.findByIdAndUpdate(contactId, contactData);

        // If the update is null, it failed; throw an error.
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
            // TODO: Need to make this more robust and consistent.
            // See comment under DELETE CONTACT.
        }

        // Send a success message
        console.log('Complete.');
        res.status(204);
    } catch (err) {
        res.status(500).json({ info: 'ERR_SERVER_ERROR' });
        console.log(`Aborted. ERROR:\n${err}`);
    }
};

/*******************************************************************************
 * DELETE CONTACT
 * /contacts/:id
 *******************************************************************************/
const deleteContact = async (req, res) => {
    try {
        console.log('Deleting Contact...');

        // Get update data from body and ID from URL
        const contactData = req.body;
        const contactId = req.params.id;

        // NOTE: Might need to manually cast to ObjectId for Render
        // const id = new ObjectId(req.params.id);

        // Update Contact
        const result = await ContactModel.findByIdAndDelete(contactId);

        // If the update is null, it failed; throw an error.
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
            /* TODO: The error handling is currently weird.
               Catch should send this kind of thrown message
               instead of a generic one...Also need to add this
               to updateContact. 
               
               Might also want to create a function that handles
               everything and accepts a lambda for the actual
               CRUD operation or something? There's lots
               of repetitive code like transactions and error
               handling I have going on... */
        }

        // Send a success message
        console.log('Complete.');
        res.status(200).json({ info: 'CONTACT_DELETED' });
    } catch (err) {
        res.status(500).json({ info: 'ERR_SERVER_ERROR' });
        console.log(`Aborted. ERROR:\n${err}`);
    }
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
};
