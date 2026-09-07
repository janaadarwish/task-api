const express = require('express');

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------
// Stage 2 - in-memory "database"
// ---------------------------------------------------------------------
const tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Walk the dog", done: true },
    { id: 3, title: "Finish W2 assignment", done: false }
];

app.get('/', (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

// GET /tasks - return the whole list
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id - return one task, or 404 if not found
app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: `Task ${id} not found` });
    }

    res.json(task);
});

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// ---------------------------------------------------------------------
// Stage 3 - create a task
// ---------------------------------------------------------------------
let nextId = 4; // tasks 1-3 already exist as seed data

app.post('/tasks', (req, res) => {
    const title = req.body && req.body.title;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Field 'title' is required and cannot be empty" });
    }

    const newTask = {
        id: nextId,
        title: title.trim(),
        done: false
    };

    tasks.push(newTask);
    nextId++;

    res.status(201).json(newTask);
});