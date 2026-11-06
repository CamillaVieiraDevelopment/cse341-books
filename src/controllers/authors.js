
import {
    getAllAuthors, getAuthorById, createAuthor, updateAuthor } from "../models/authors.js";

const getAllAuthorsController = async (req, res) => {
    try {
        const authors = await getAllAuthors();

        return res.status(200).json(authors);
    } catch (error) {
        console.error("Error retrieving authors:", error);

        return res.status(500).json({
            error: "Unable to retrieve authors."
        });
    }
};
const getAuthorByIdController = async (req, res) => {
    try {
        const author = await getAuthorById(req.params.id);

        if (!author) {
            return res.status(404).json({
                error: "Author not found."
            });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error("Error retrieving author:", error);

        return res.status(500).json({
            error: "Unable to retrieve author."
        });
    }
};


const createAuthorController = async (req, res) => {
    try {
        const { id, name, birthYear } = req.body;

        // Validate required fields
        if (
            typeof id !== "string" || !id.trim() ||
            typeof name !== "string" || !name.trim() ||
            typeof birthYear !== "number" ||
            !Number.isInteger(birthYear) ||
            birthYear > new Date().getFullYear()
        ) {
            return res.status(400).json({
                error: "Invalid author data. Provide a valid id, name, and birthYear."
            });
        }

        // Check if the custom ID already exists
        const existingAuthor = await getAuthorById(id);

        if (existingAuthor) {
            return res.status(409).json({
                error: "An author with this ID already exists."
            });
        }

        const newAuthor = {
            id: id.trim(),
            name: name.trim(),
            birthYear
        };

        const createdAuthor = await createAuthor(newAuthor);

        return res.status(201).json(createdAuthor);
    } catch (error) {
        console.error("Error creating author:", error);

        return res.status(500).json({
            error: "Unable to create author."
        });
    }
};


const updateAuthorController = async (req, res) => {
    try {
        const { name, birthYear } = req.body;
        const { id } = req.params;

        // Prevent changes to the custom ID
        if (Object.hasOwn(req.body, "id")) {
            return res.status(400).json({
                error: "The author ID cannot be changed."
            });
        }

        // Validate required fields
        if (
            typeof name !== "string" || !name.trim() ||
            typeof birthYear !== "number" ||
            !Number.isInteger(birthYear) ||
            birthYear > new Date().getFullYear()
        ) {
            return res.status(400).json({
                error: "Invalid author data. Provide a valid name and birthYear."
            });
        }

        const updatedAuthor = await updateAuthor(id, {
            name: name.trim(),
            birthYear
        });

        if (!updatedAuthor) {
            return res.status(404).json({
                error: "Author not found."
            });
        }

        return res.status(200).json(updatedAuthor);
    } catch (error) {
        console.error("Error updating author:", error);

        return res.status(500).json({
            error: "Unable to update author."
        });
    }
};



export {
    getAllAuthorsController, getAuthorByIdController, createAuthorController, updateAuthorController};   