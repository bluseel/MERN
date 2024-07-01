const express = require('express');
const mongoose = require('mongoose');
const { Section } = require('../models/userModel'); // Adjust the path as necessary

const router = express.Router();

// Default route
router.get("/", async (req, res) => {
    try {
        res.status(200).send("meow");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// C - CREATE SECTION
router.post("/sections", async (req, res) => {
    try {
        const { name } = req.body;
        const sectionAdded = await Section.create({ name });
        res.status(200).json(sectionAdded);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// R - Fetch all sections
router.get("/sections", async (req, res) => {
    try {
        const allSections = await Section.find();
        res.status(200).json(allSections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// R - Fetching one section by id
router.get("/sections/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const singleSection = await Section.findById(id);
        if (!singleSection) {
            return res.status(404).json({ error: "Section not found" });
        }
        res.status(200).json(singleSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// U - UPDATE SECTION NAME
router.patch("/sections/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSection = await Section.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (!updatedSection) {
            return res.status(404).json({ error: "Section not found" });
        }
        res.status(200).json(updatedSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// D - DELETE SECTION
router.delete("/sections/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSection = await Section.findByIdAndDelete(id);
        if (!deletedSection) {
            return res.status(404).json({ error: "Section not found" });
        }
        res.status(200).json(deletedSection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
