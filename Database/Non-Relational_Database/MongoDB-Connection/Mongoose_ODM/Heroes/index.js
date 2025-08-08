import { mongoose } from "mongoose";
import "dotenv/config"

const database = process.env.db;
const collection = "Hero";

// Establishing connection
mongoose.connect(`${process.env.uri}/${database}`);

// Schema
// (i). Schema Definition
const heroSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    occupation: String
});
//(ii). Schema Definition with Data-Validators
const heroSchema2 = new mongoose.Schema({
    _id: { type: Number, required: [true, "id is missing"], min: 1 },
    name: { type: String, required: [true, "name is missing"] },
    occupation: { type: String, required: [true, "occupation is missing"] }
});

// Model (can be referred as collection) 
const Hero = mongoose.model(collection, heroSchema);
const h1 = new Hero({ _id: 1, name: "C. V. Raman" });
const h2 = new Hero({ _id: 2, name: "Vikram Sarabhai", occupation: "Physicist and Astronomer" });
const h3 = new Hero({ _id: 3, name: "Salim Ali", occupation: "Ornithologist and Naturalist" });
const h4 = new Hero({ _id: 4, name: "A. P. J. Abdul Kalam", occupation: "Aerospace Scientist" });
const h5 = new Hero({ _id: 5, name: "Janaki Ammal", occupation: "Botanist" });
const h6 = new Hero({ _id: 6 });
const h7 = new Hero({ _id: 91, name: "Janaki Ammal", occupation: "Botanist" });
const h8 = new Hero({ _id: 92, name: "Janaki Ammal", occupation: "Botanist" });
const h9 = new Hero({ _id: 95, name: "Janaki Ammal", occupation: "Botanist" });


// 1). Create a new Document(s)
console.log("\n");
console.log("Create Operation");
// (i). Insert a single document
async function insertHero(hero) {
    try {
        const result = await h1.save();
        console.log("Document inserted with id: " + result._id);
    } catch (err) {
        console.log("Error inserting one:", err);
    }
}
await insertHero(h1);
// h1.save().then(() => console.log("Document inserted with id: " + h1._id)).catch((err) => console.log("Error inserting one:", err));


// (ii). Insert multiple documents
async function insertHeroes(heroes) {
    try {
        const docs = await Hero.insertMany(heroes);
        console.log(docs.length + " documents inserted.");
    } catch (err) {
        console.log("Error inserting documents:", err);
    }
}
const heroes = [h2, h3, h4, h5, h6, h7, h8, h9];
await insertHeroes(heroes);
// Hero.insertMany([h2, h3, h4, h5, h6, h7, h8, h9]).then((docs) => console.log(docs.length + " documents inserted.")).catch((err)=>console.log("Error inserting multiple docs:", err));



// 2). Read a Document(s)
console.log("\n\n");
console.log("Read Operation");
// (i). Find all documents which match the filter
async function showHeroes() {
    try {
        const heroes = await Hero.find({});
        console.log(heroes);
        console.log("\n");
    } catch (err) {
        console.log("Error fetching heroes:", err);
    }
}
await showHeroes();

async function printHeroNames() {
    try {
        const heroes = await Hero.find({});
        heroes.forEach((hero) => {
            if (hero.name!=undefined) {
                console.log(hero.name);
            }
        });
    } catch (err) {
        console.log("Error fetching heroes:", err);
    }
}
await printHeroNames();
// Hero.find({}).then((heroes) => heroes.forEach(hero => { console.log(hero.name) })).catch((err)=>console.log("Error fetching heroes:", err));

// (ii). Find a single document which matches the filter
async function getHeroById(id) {
    try {
        const hero = await Hero.findOne({ _id: id });
        console.dir(hero._doc);
    } catch (err) {
        console.log("Error fetching hero:", err);
    }
}
await getHeroById(2);
// Hero.findOne({ _id: 2 }).then((hero) => console.dir(hero)).catch((err)=>console.log("Error fetching hero",err));

// 3). Update a new Document(s) 
console.log("\n\n");
console.log("Update Operation");
// (i). Update a single document
async function updateHero(condition, updateContent) {
    try {
        const result = await Hero.updateOne(condition, updateContent);
        console.log(result.modifiedCount + " Document Updated");
    } catch (err) {
        console.log("Error updating document:", err);
    }
}
await updateHero({ _id: 6 }, { occupation: "Physicist" });
// Hero.updateOne({ _id: 6 }, { occupation: "Physicist" }).then((result) => {console.log(result.modifiedCount + " Document Updated");}).catch((err) => {console.log("Error updating document:", err);});
await showHeroes();
console.log("\n");

// // (ii). Update multiple documents
async function updateHeroes(condition, updateContent) {
    try {
        const result = await Hero.updateMany(condition, updateContent, { strict: false });
        console.log(result)
        console.log(result.modifiedCount + " Document(s) Updated");
    } catch (err) {
        console.log("Error updating documents:", err);
    }
}
await updateHeroes({ _id: { $gte: 91 } }, { $set: { status: "fraud entry" } });


// Hero.updateMany({ _id: { $gte: 4 } }, { hobby: "fun" }).then((result) => {console.log(result.modifiedCount + " Document(s) Updated");}).catch((err) => {console.log("Error updating documents:", err);});
await showHeroes();


// 4). Delete a new Document(s)
console.log("\n\n");
console.log("Delete Operation");

// (i). Delete a single document
async function deleteHero(condition) {
    try {
        const result = await Hero.deleteOne(condition);
        console.log(result.deletedCount + " Document Deleted");
    } catch (err) {
        console.log("Error deleting document:", err);
    }
}
await deleteHero({ _id: 6 });
// Hero.deleteOne({ _id: 6 }).then((result) => {console.log(result.deletedCount + " Document Deleted");}).catch((err) => {console.log("Error deleting document:", err);});
await showHeroes();

// // (ii). Delete multiple documents
async function deleteManyHeroes(condition) {
    try {
        const result = await Hero.deleteMany(condition);
        console.log(result.deletedCount + " Document(s) Deleted");
    } catch (err) {
        console.log("Error deleting documents:", err);
    }
}
await deleteManyHeroes({ status: "fraud entry" });
// Hero.deleteMany({ _id: { $gte: 91 } }).then((result) => {console.log(result.deletedCount + " Document(s) Deleted");}).catch((err) => {console.log("Error deleting documents:", err);});
await showHeroes();

// 5). One-to-Many Relation
console.log("\n\n");
console.log("ONE-TO-MANY Relation");
const student_collection = "Student";
const student_Schema = new mongoose.Schema({
    _id: Number,
    name: String,
    ideal: heroSchema
});
const Student = mongoose.model(student_collection, student_Schema);
const s1 = new Student({
    _id: 1,
    name: "L",
    ideal: h1
});
const s2 = new Student({
    _id: 3,
    name: "N",
    ideal: h1
});
await Student.insertMany([s1, s2]).then((docs) => console.log(docs)).catch((e) => console.log("Error inserting students, ", e));

// Close the connection
mongoose.connection.close();