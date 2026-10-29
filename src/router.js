// src/router.js
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();
console.log('Router loaded: /books and /books/:id');

router.get('/books', getBooksHandler);
router.get('/books/:id', getBookByIdHandler);


export default router;