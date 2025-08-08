import { MongoClient } from "mongodb";
import "dotenv/config";

const uri = process.env.uri;
const client = new MongoClient(uri);
const database=process.env.db;
const collection="heroes";

async function run() {
    try {
        // Connect to the "db" database and access its "dbCollection" collection.
        const db = client.db(database);
        const dbCollection = db.collection(collection);
        console.log("Connection established...");

        // 1). Create a new Document(s)
        console.log("\n\n");
        console.log("Create Operation");
        const insertOption={ ordered: false };
        const oneHero={ _id: 2, name: 'Vikram Sarabhai', occupation: 'Physicist and Astronomer' };
        const insertOneDoc= await dbCollection.insertOne(oneHero);
        console.log("Document inserted with id: " + insertOneDoc.insertedId);
        const manyHeroes=[{ _id: 1, name: 'C. V. Raman' }, { _id: 3, name: "Salim Ali", occupation: "Ornithologist and Naturalist" }, { _id: 4, name: "A. P. J. Abdul Kalam", occupation: "Aerospace Scientist" }, { _id: 5, name: "Janaki Ammal", occupation: "Botanist" }, { _id: 6 }];
        const insertManyDocs=await dbCollection.insertMany(manyHeroes,insertOption);
        console.log(insertManyDocs.insertedCount + " documents inserted.");

        // 2). Read a Document(s)
        console.log("\n\n");
        console.log("Read Operation");
        const hero={_id:2};
        const findDoc=await dbCollection.findOne(hero);
        console.log(findDoc);
        async function showHeroes(){
        const findOption={sort:{name:1},projection:{_id:1,name:1}};
        const findDocs=dbCollection.find({},findOption);
            for await(const doc of findDocs){
                console.dir(doc); 
            }
        }
        await showHeroes();


        // 3). Update a new Document(s)
        console.log("\n\n");
        console.log("Update Operation");
        const updateFilter={_id:1};
        const updateOption = { upsert: true }; 
        const updateDocContent = { $set: { occupation: "Physicist" } };
        const updateDoc=await dbCollection.updateOne(updateFilter,updateDocContent,updateOption);
        console.log(updateDoc.matchedCount + " document(s) matched the filter and " + updateDoc.modifiedCount + " document(s) was/were updated.");
        await showHeroes();
        
        // 4). Delete a new Document(s)
        console.log("\n\n");
        console.log("Delete Operation");
        const deleteFilter={_id:6};
        const deleteDoc=await dbCollection.deleteOne(deleteFilter);
        console.log(deleteDoc.deletedCount + " document(s) deleted.");
        await showHeroes();

    }catch(e){
        console.log("ERROR Cannot establish connection",e);
    } finally {  
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log("Connection closed...");
    }
}

run().catch(console.dir); 