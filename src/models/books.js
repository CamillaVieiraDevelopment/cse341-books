// src/models/books.js
import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const db = getDb();
    const collection = db.collection('books');

    return await collection.find({}).toArray();
};

const getBookById = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');

    return await collection.findOne({ id: bookId });
};

const createBook = async (book) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const authorsCollection = db.collection('authors');

    const author = await authorsCollection.findOne({
        id: book.authorId
    });

    if (!author) {
        const error = new Error('The specified author does not exist.');
        error.code = 'AUTHOR_NOT_FOUND';
        throw error;
    }

    try {
        const result = await booksCollection.insertOne(book);

        return await booksCollection.findOne({
            _id: result.insertedId
        });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateError = new Error(
                'The specified ID already exists.'
            );
            duplicateError.code = 'BOOK_DUPLICATE';
            throw duplicateError;
        }

        throw error;
    }
};

const updateBook = async (bookId, book) => {
    const db = getDb();
    const booksCollection = db.collection('books');
    const authorsCollection = db.collection('authors');

    const existingBook = await booksCollection.findOne({
        id: bookId
    });

    if (!existingBook) {
        return { status: 'not_found' };
    }

    const author = await authorsCollection.findOne({
        id: book.authorId
    });

    if (!author) {
        return { status: 'author_not_found' };
    }

    const replacement = {
        id: bookId,
        authorId: book.authorId,
        title: book.title,
        publicationDate: book.publicationDate
    };

    await booksCollection.replaceOne(
        { id: bookId },
        replacement
    );

    return await booksCollection.findOne({
        id: bookId
    });
};

const deleteBook = async (bookId) => {
    const db = getDb();
    const collection = db.collection('books');

    const result = await collection.deleteOne({
        id: bookId
    });

    if (result.deletedCount === 0) {
        return { status: 'not_found' };
    }

    return { status: 'deleted' };
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};