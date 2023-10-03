const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { ContactModel } = require('../models');

/*******************************************************************************
 * GET ALL CONTACTS
 * /contacts
 ******************************************************************************/
const getAllContacts = async (req, res) => {
    /*
    #swagger.tags['Contacts']
    #swagger.summary = 'Get all contacts.'
    #swagger.description = 'Returns an array of all contacts from the database.'
    #swagger.responses[200] = {
        description: 'Array of all contacts successfully retrieved.',
        schema: { $ref: '#/definitions/ContactArrayOutput' }
    }
    */
    const allContacts = await ContactModel.find();
    res.send(allContacts);
};

/*******************************************************************************
 * GET CONTACT BY ID
 * /contacts/:id
 ******************************************************************************/
const getContactById = async (req, res) => {
    /*
    #swagger.tags['Contacts']
    #swagger.summary = 'Get a contact by ID.'
    #swagger.description = 'Retrieves one contact from the database that has the contact_id provided as a URL parameter.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID for the contact to be retrieved.',
        required: true,
        schema: { $ref: '#/definitions/id' }
    }
    #swagger.responses[200] = {
        description: 'Contact successfully retrieved.',
        schema: { $ref: '#/definitions/ContactOutput' }
    }
    */
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
    /*
    #swagger.tags['Contacts']
    #swagger.summary = 'Create a contact.'
    #swagger.description = 'Create a contact and insert it into the database.'
    #swagger.parameters['contact'] = {
        in: 'body',
        description: 'The contact object to be inserted.',
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
    }
    */
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

        // Send a success message with the new contact's ID
        res.status(201).json({
            info: 'CONTACT_CREATED',
            contactId: contact._id
        });
        /* 
        #swagger.responses[201] = {
            description: 'Contact created successfully.',
            schema: {
                info: 'CONTACT_CREATED',
                contactId: { $ref: '#/definitions/id' }
            }
        }
        */
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
    /*
    #swagger.tags['Contacts']
    #swagger.summary = 'Update a contact.'
    #swagger.description = 'Update a contact and insert it into the database.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID for the contact to be updated.',
        required: true,
        schema: { $ref: '#/definitions/id' }
    }
    #swagger.parameters['contact'] = {
        in: 'body',
        description: 'An object containing the properties to be updated and their new values.'
        required: true,
        schema: { $ref: '#/definitions/ContactInput' }
    }
    */
    try {
        console.log('Updating Contact...');

        // Get update data from body and ID from URL
        const contactData = req.body;
        const contactId = req.params.id;

        // Update Contact
        const result = await ContactModel.findByIdAndUpdate(contactId, contactData);

        // If the update is null, it failed; throw an error.
        if (!result) {
            throw 'ERR_DATABASE_ERROR';
            // TODO: Need to make this more robust and consistent.
            // See comment under DELETE CONTACT.
        }

        // Send a success message
        console.log('Complete.');
        res.status(204).send();
        /*
        #swagger.responses[204] = {
            description: 'Contact successfully updated.'
        }
        */
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
    /*
    #swagger.tags['Contacts']
    #swagger.summary = 'Deletes a contact.'
    #swagger.description = 'Finds the contact with the ID provided in the URL and drops it from the database.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID for the contact to be deleted.',
        required: true,
        schema: { $ref: '#/definitions/id' }
    }
    */
    try {
        console.log('Deleting Contact...');

        // Get update data from body and ID from URL
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
        /*
        #swagger.responses[201] = {
            description: 'Contact successfully deleted.'
        }
        */
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
    deleteContact
};
