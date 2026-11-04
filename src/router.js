
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

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

export default router;
