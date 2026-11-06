import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

import {
    getAllAuthorsController,
    getAuthorByIdController,
    createAuthorController,
    updateAuthorController

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
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "672a12345678901234567890"
 *                   id:
 *                     type: string
 *                     example: "b1"
 *                   title:
 *                     type: string
 *                     example: "As in Heaven, So on Earth"
 *                   author:
 *                     type: string
 *                     example: "Jeffrey R. Holland and Patricia T. Holland"
 *                   publicationDate:
 *                     type: string
 *                     format: date
 *                     example: "1989-01-01"
 *       500:
 *         description: Internal server error.
 */
router.get('/books', getBooksHandler);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     description: Returns a single book matching the specified ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book.
 *         schema:
 *           type: string
 *         example: "b1"
 *     responses:
 *       200:
 *         description: Successfully retrieved the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "672a12345678901234567890"
 *                 id:
 *                   type: string
 *                   example: "b1"
 *                 title:
 *                   type: string
 *                   example: "As in Heaven, So on Earth"
 *                 author:
 *                   type: string
 *                   example: "Jeffrey R. Holland and Patricia T. Holland"
 *                 publicationDate:
 *                   type: string
 *                   format: date
 *                   example: "1989-01-01"
 *       400:
 *         description: Invalid book ID.
 *       404:
 *         description: Book not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/books/:id', getBookByIdHandler);


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

export default router;
