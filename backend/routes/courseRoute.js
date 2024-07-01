const express = require('express');
const mongoose = require('mongoose');
const { Section } = require('../models/userModel'); // Adjust the path as necessary

const router = express.Router();

// C - CREATE COURSE
router.post("/sections/:id/courses", async (req, res) => {
    try {
        const { id } = req.params;
        const courseName = req.body.name;

        // Find the section by ID
        const singleSection = await Section.findById(id);
        if (!singleSection) {
            return res.status(404).json({ error: "Section not found" });
        }

        // Create a new course
        const newCourse = { name: courseName };
        singleSection.courses.push(newCourse);

        // Save the updated section
        await singleSection.save();

        res.status(200).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// R - READ ALL COURSES
router.get("/sections/:id/courses", async (req, res) => {
    try {
        const { id } = req.params;
        const singleSection = await Section.findById(id);

        if (!singleSection) {
            return res.status(404).json({ error: "Section not found" });
        }

        const allCourses = singleSection.courses;

        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// R - READ ONE COURSE
router.get("/sections/:sectionId/courses/:courseId", async (req, res) => {
    try {
        const { sectionId, courseId } = req.params;

        const singleSection = await Section.findById(sectionId);

        if (!singleSection) {
            return res.status(404).json({ error: "Section not found" });
        }

        const singleCourse = singleSection.courses.id(courseId);

        if (!singleCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(singleCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// U - UPDATE COURSE
router.put("/sections/:sectionId/courses/:courseId", async (req, res) => {
    try {
        const { sectionId, courseId } = req.params;
        const { courseName } = req.body;

        // console.log(`Updating course with ID: ${courseId} in section: ${sectionId}`); // Log the parameters
        // console.log(`New course name: ${courseName}`); // Log the new course name

        // Find the section by ID
        const singleSection = await Section.findById(sectionId);

        if (!singleSection) {
            console.log("Section not found");
            return res.status(404).json({ error: "Section not found" });
        }

        // Find the course within the section's courses array
        const singleCourse = singleSection.courses.id(courseId);

        if (!singleCourse) {
            console.log("Course not found");
            return res.status(404).json({ error: "Course not found" });
        }

        // Log the current state of the course
        // console.log("Current course:", singleCourse);

        // Update course details
        if (courseName) {
            singleCourse.name = courseName;
        }

        // Save the updated section
        await singleSection.save();

        // Log the updated state of the course
        // console.log("Updated course:", singleCourse);

        res.status(200).json(singleCourse);
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ error: error.message });
    }
});

// D - DELETE COURSE
router.delete("/sections/:sectionId/courses/:courseId", async (req, res) => {
    try {
        const { sectionId, courseId } = req.params;
        // console.log(`Deleting course with ID: ${courseId} in section: ${sectionId}`); // Log the parameters

        const singleSection = await Section.findById(sectionId);

        if (!singleSection) {
            return res.status(404).json({ error: "Section not found" });
        }

        const courseIndex = singleSection.courses.findIndex(course => course._id.equals(courseId));

        if (courseIndex === -1) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Remove the course from the array
        singleSection.courses.splice(courseIndex, 1);

        // Save the updated section
        await singleSection.save();

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
