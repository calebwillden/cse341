const express = require('express');
const { MongoClient } = require('mongodb');

const connect = async () => {
    const uri = `mongodb+srv://${process.env.username}:${process.env.password}@cse341-caleb-willden.aw05k4k.mongodb.net/`;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
};

module.exports = connect;
