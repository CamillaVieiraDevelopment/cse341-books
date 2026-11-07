
import express from 'express';

import {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
} from './controllers/books.js';

import {
    getAllAuthorsController,
    getAuthorByIdController,
    createAuthorController,
    updateAuthorController,
    deleteAuthorController
} from './controllers/authors.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve all books
 *     description: Returns a list of all books stored in the database.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/books', getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Returns a single book matching the specified custom ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique custom identifier of the book.
 *         schema:
 *           type: string
 *         example: "b1"
 *     responses:
 *       200:
 *         description: Successfully retrieved the book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/books/:id', getBookByIdHandler);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Creates a new book associated with an existing author.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *           example:
 *             id: "b4"
 *             authorId: "a1"
 *             title: "The Ministry of the Twelve"
 *             publicationDate: "2016-01-01"
 *     responses:
 *       201:
 *         description: Book successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid book data or specified author does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: A book with this custom ID already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/books', createBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Replaces the editable fields of a book. The custom ID cannot be changed.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique custom identifier of the book to update.
 *         schema:
 *           type: string
 *         example: "b1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookUpdate'
 *           example:
 *             authorId: "a1"
 *             title: "Updated Book Title"
 *             publicationDate: "2020-05-15"
 *     responses:
 *       200:
 *         description: Book successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Invalid book data, attempted ID modification, or specified author does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/books/:id', updateBookHandler);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book using its custom ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique custom identifier of the book to delete.
 *         schema:
 *           type: string
 *         example: "b1"
 *     responses:
 *       204:
 *         description: Book successfully deleted.
 *       404:
 *         description: Book not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/books/:id', deleteBookHandler);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "672a12345678901234567890"
 *         id:
 *           type: string
 *           example: "b1"
 *         authorId:
 *           type: string
 *           example: "a1"
 *         title:
 *           type: string
 *           example: "As in Heaven, So on Earth"
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "1989-01-01"
 *     NewBook:
 *       type: object
 *       required:
 *         - id
 *         - authorId
 *         - title
 *         - publicationDate
 *       properties:
 *         id:
 *           type: string
 *           example: "b4"
 *         authorId:
 *           type: string
 *           example: "a1"
 *         title:
 *           type: string
 *           example: "The Ministry of the Twelve"
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "2016-01-01"
 *     BookUpdate:
 *       type: object
 *       required:
 *         - authorId
 *         - title
 *         - publicationDate
 *       properties:
 *         authorId:
 *           type: string
 *           example: "a1"
 *         title:
 *           type: string
 *           example: "Updated Book Title"
 *         publicationDate:
 *           type: string
 *           format: date
 *           example: "2020-05-15"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           example: "Book not found."
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Endpoints for managing authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retrieve all authors
 *     description: Returns a list of all authors stored in the database.
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   id:
 *                     type: string
 *                     example: "a1"
 *                   name:
 *                     type: string
 *                     example: "Jeffrey R. Holland"
 *                   birthYear:
 *                     type: integer
 *                     example: 1940
 *       500:
 *         description: Internal server error.
 */
router.get('/authors', getAllAuthorsController);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retrieve an author by ID
 *     description: Returns a single author matching the specified ID.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author.
 *         schema:
 *           type: string
 *         example: "a1"
 *     responses:
 *       200:
 *         description: Successfully retrieved the author.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 id:
 *                   type: string
 *                   example: "a1"
 *                 name:
 *                   type: string
 *                   example: "Jeffrey R. Holland"
 *                 birthYear:
 *                   type: integer
 *                   example: 1940
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/authors/:id', getAuthorByIdController);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Creates a new author in the database.
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: "a5"
 *               name:
 *                 type: string
 *                 example: "C. S. Lewis"
 *               birthYear:
 *                 type: integer
 *                 example: 1898
 *     responses:
 *       201:
 *         description: Author successfully created.
 *       400:
 *         description: Invalid author data.
 *       409:
 *         description: An author with this ID already exists.
 *       500:
 *         description: Internal server error.
 */
router.post('/authors', createAuthorController);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an existing author
 *     description: Updates an author's name and birth year. The custom ID cannot be changed.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author to update.
 *         schema:
 *           type: string
 *         example: "a1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jeffrey R. Holland"
 *               birthYear:
 *                 type: integer
 *                 example: 1940
 *     responses:
 *       200:
 *         description: Author successfully updated.
 *       400:
 *         description: Invalid author data or attempted ID modification.
 *       404:
 *         description: Author not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/authors/:id', updateAuthorController);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author only if no books are associated with them.
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author to delete.
 *         schema:
 *           type: string
 *         example: "a5"
 *     responses:
 *       204:
 *         description: Author successfully deleted.
 *       404:
 *         description: Author not found.
 *       409:
 *         description: Cannot delete author because associated books exist.
 *       500:
 *         description: Internal server error.
 */
router.delete('/authors/:id', deleteAuthorController);

export default router;
