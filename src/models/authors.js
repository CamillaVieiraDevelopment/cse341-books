// src/models/authors.js
import { getDb } from '../db/connect.js';

const getAllAuthors = async () => {
    const db = getDb();
    const authorsCollection = db.collection('authors');

    return await authorsCollection.find().toArray();
};

const getAuthorById = async (id) => {
    const db = getDb();
    const authorsCollection = db.collection('authors');

    return await authorsCollection.findOne({ id });
};

const createAuthor = async (author) => {
    const db = getDb();
    const authorsCollection = db.collection('authors');

    const result = await authorsCollection.insertOne(author);

    return await authorsCollection.findOne({
        _id: result.insertedId
    });
};

const updateAuthor = async (id, author) => {
    const db = getDb();
    const authorsCollection = db.collection('authors');

    const result = await authorsCollection.updateOne(
        { id },
        { $set: author }
    );

    if (result.matchedCount === 0) {
        return null;
    }

    return await authorsCollection.findOne({ id });
};

const deleteAuthor = async (id) => {
    const db = getDb();

    const authorsCollection = db.collection('authors');
    const booksCollection = db.collection('books');

    // Check whether the author exists.
    const author = await authorsCollection.findOne({ id });

    if (!author) {
        return { status: 'not_found' };
    }

    // Check whether the author has associated books.
    const associatedBook = await booksCollection.findOne({
        authorId: id
    });

    if (associatedBook) {
        return { status: 'has_books' };
    }

    // Delete the author.
    await authorsCollection.deleteOne({ id });

    return { status: 'deleted' };
};

export {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};