const express = require('express');
const mongoose = require('mongoose');
const {Task, Course, Section} = require('../models/userModel'); // Adjust the path as necessary


const router = express.Router();

// C - CREATE TASK
router.post("/sections/:sectionId/courses/:courseId/tasks", async (req, res) => {
    try {
        const { sectionId, courseId } = req.params;
        const { name, description, date, link } = req.body;

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        const course = section.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const newTask = { name, description, date, link };
        course.tasks.push(newTask);


        await section.save();

        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// R - READ ALL TASKS
router.get("/sections/:sectionId/courses/:courseId/tasks", async (req, res) => {
    try {
        const { sectionId, courseId } = req.params;

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        const course = section.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course.tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// R - READ ONE TASK
router.get("/sections/:sectionId/courses/:courseId/tasks/:taskId", async (req, res) => {
    try {
        const { sectionId, courseId, taskId } = req.params;

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        const course = section.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const task = course.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// U - UPDATE TASK
router.put("/sections/:sectionId/courses/:courseId/tasks/:taskId", async (req, res) => {
    try {
        const { sectionId, courseId, taskId } = req.params;
        const { name, description, date, link } = req.body;

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        const course = section.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const task = course.tasks.id(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (name) task.name = name;
        if (description) task.description = description;
        if (date) task.date = date;
        if (link) task.link = link;

        await section.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// D - DELETE TASK
router.delete("/sections/:sectionId/courses/:courseId/tasks/:taskId", async (req, res) => {
    try {
        const { sectionId, courseId, taskId } = req.params;

        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({ error: "Section not found" });
        }

        const course = section.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Use filter to remove the task from the array
        course.tasks = course.tasks.filter(task => !task._id.equals(taskId));

        await section.save();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;