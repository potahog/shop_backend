require('dotenv').config();
const { MongoClient } = require('mongodb');

const userName = encodeURIComponent("admin");
const password = encodeURIComponent("1q2w#E$R");
const clusterUrl = "localhost:27017";

const authMechanism = "DEFAULT";

const uri = `mongodb://${userName}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

const client = new MongoClient(uri);

// const dbname = "shoppingmall";
const dbname = "TestDB";

const database = {
    find: find,
    insertOne: insertOne,
    updateOne: updateOne,
}

async function connect(collectionname){
    try {

        await client.connect();
        const db = client.db(dbname);
        return db.collection(collectionname);

    } catch(e) {
        console.log(e);
        return e;
    }
}

async function find(collectionname, query, option) {
    try{
        const collection = await connect(collectionname);

        const result = await collection.findOne(query, option);
    
        return result;
    } catch(e) {
        console.log(e);
        const result = {
            code: "401",
            err: e
        }
        return result;
    } finally{
        await client.close();
        console.log("client is closed")
    }
}

async function insertOne(collectionname, doc){

    try {
        const collection = await connect(collectionname);
        
        const result = await collection.insertOne(doc);

        return result;
    } catch(e) {

    } finally {
        await client.close();
        console.log("client is closed")
    }

}

async function updateOne(collectionname, doc){
    try {
        const collection = await connect(collectionname);
        
        const result = await collection.insertOne(doc);

        return result;
    } catch(e) {

    } finally {
        await client.close();
        console.log("client is closed")
    }
}

module.exports.database = database;
