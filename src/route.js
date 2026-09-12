const express = require('express');
const router = express.Router();
const service = require('./service');

router.get('/', (req, res) => {
    res.json(service.getAllTasks());
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = service.getTaskById(id);
    if (!task) return res.status(404).json({ error: `Task ${id} not found` });
    res.json(task);
});

router.post('/', (req, res) => {
    const result = service.createTask(req.body && req.body.title);
    if (result.error) return res.status(400).json({ error: result.error });
    res.status(201).json(result.data);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = service.updateTask(id, req.body);
    if (result.notFound) return res.status(404).json({ error: `Task ${id} not found` });
    if (result.error) return res.status(400).json({ error: result.error });
    res.json(result.data);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ok = service.deleteTask(id);
    if (!ok) return res.status(404).json({ error: `Task ${id} not found` });
    res.status(204).send();
});

module.exports = router;