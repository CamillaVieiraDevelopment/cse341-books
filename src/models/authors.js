
import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
    const db = getDb();
    const authorsCollection = db.collection("authors");

    const authors = await authorsCollection.find().toArray();

    return authors;
};
const getAuthorById = async (id) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");

    const author = await authorsCollection.findOne({ id });

    return author;
};

const createAuthor = async (author) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");

    const result = await authorsCollection.insertOne(author);

    const createdAuthor = await authorsCollection.findOne({
        _id: result.insertedId
    });

    return createdAuthor;
};

const updateAuthor = async (id, author) => {
    const db = getDb();
    const authorsCollection = db.collection("authors");

    const result = await authorsCollection.updateOne(
        { id },
        { $set: author }
    );

    if (result.matchedCount === 0) {
        return null;
    }

    return await authorsCollection.findOne({ id });
};


export { getAllAuthors, getAuthorById, createAuthor, updateAuthor };