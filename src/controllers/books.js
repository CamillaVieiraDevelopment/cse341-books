// src/controllers/books.js
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../models/books.js';

// Validates whether the request body is a plain object.
const isValidObject = (body) => {
    return (
        body !== null &&
        typeof body === 'object' &&
        !Array.isArray(body)
    );
};

// Validates a date in the exact YYYY-MM-DD format.
const isValidDate = (date) => {
    if (typeof date !== 'string') {
        return false;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(date)) {
        return false;
    }

    const [year, month, day] = date.split('-').map(Number);

    if (year < 1 || month < 1 || month > 12) {
        return false;
    }

    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    return (
        parsedDate.getUTCFullYear() === year &&
        parsedDate.getUTCMonth() === month - 1 &&
        parsedDate.getUTCDate() === day
    );
};

// Validates the required fields for creating a book.
const isValidNewBook = (body) => {
    return (
        isValidObject(body) &&
        typeof body.id === 'string' &&
        body.id.trim() !== '' &&
        typeof body.authorId === 'string' &&
        body.authorId.trim() !== '' &&
        typeof body.title === 'string' &&
        body.title.trim() !== '' &&
        isValidDate(body.publicationDate)
    );
};

// Validates the required fields for updating a book.
const isValidBookUpdate = (body) => {
    return (
        isValidObject(body) &&
        typeof body.authorId === 'string' &&
        body.authorId.trim() !== '' &&
        typeof body.title === 'string' &&
        body.title.trim() !== '' &&
        isValidDate(body.publicationDate)
    );
};

// GET /books
const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();

        return res.status(200).json(books);
    } catch (error) {
        console.error('GET /books failed:', error);

        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};

// GET /books/:id
const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({
                error: 'Book not found.'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error('GET /books/:id failed:', error);

        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};

// POST /books
const createBookHandler = async (req, res) => {
    if (!isValidNewBook(req.body)) {
        return res.status(400).json({
            error: 'Invalid book data.'
        });
    }

    const book = {
        id: req.body.id.trim(),
        authorId: req.body.authorId.trim(),
        title: req.body.title.trim(),
        publicationDate: req.body.publicationDate
    };

    try {
        const createdBook = await createBook(book);

        return res.status(201).json(createdBook);
    } catch (error) {
        if (error.code === 'AUTHOR_NOT_FOUND') {
            return res.status(400).json({
                error: 'The specified author does not exist.'
            });
        }

        if (
            error.code === 'BOOK_DUPLICATE' ||
            error.code === 11000
        ) {
            return res.status(409).json({
                error: 'The specified ID already exists.'
            });
        }

        console.error('POST /books failed:', error);

        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};

// PUT /books/:id
const updateBookHandler = async (req, res) => {
    if (isValidObject(req.body) && 'id' in req.body) {
        return res.status(400).json({
            error: 'The custom ID cannot be changed.'
        });
    }

    if (!isValidBookUpdate(req.body)) {
        return res.status(400).json({
            error: 'Invalid book data.'
        });
    }

    const book = {
        authorId: req.body.authorId.trim(),
        title: req.body.title.trim(),
        publicationDate: req.body.publicationDate
    };

    try {
        const result = await updateBook(req.params.id, book);

        if (result.status === 'not_found') {
            return res.status(404).json({
                error: 'Book not found.'
            });
        }

        if (result.status === 'author_not_found') {
            return res.status(400).json({
                error: 'The specified author does not exist.'
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('PUT /books/:id failed:', error);

        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};

// DELETE /books/:id
const deleteBookHandler = async (req, res) => {
    try {
        const result = await deleteBook(req.params.id);

        if (result.status === 'not_found') {
            return res.status(404).json({
                error: 'Book not found.'
            });
        }

        return res.status(204).send();
    } catch (error) {
        console.error('DELETE /books/:id failed:', error);

        return res.status(500).json({
            error: 'Internal server error.'
        });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
};