const express = require('express');
const router = express.Router();
const service = require('./service');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', (req, res) => {
    res.json(service.getAllTasks());
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The task
 *       404:
 *         description: Task not found
 */
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = service.getTaskById(id);
    if (!task) return res.status(404).json({ error: `Task ${id} not found` });
    res.json(task);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Invalid input
 */
router.post('/', (req, res) => {
    const result = service.createTask(req.body && req.body.title);
    if (result.error) return res.status(400).json({ error: result.error });
    res.status(201).json(result.data);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = service.updateTask(id, req.body);
    if (result.notFound) return res.status(404).json({ error: `Task ${id} not found` });
    if (result.error) return res.status(400).json({ error: result.error });
    res.json(result.data);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ok = service.deleteTask(id);
    if (!ok) return res.status(404).json({ error: `Task ${id} not found` });
    res.status(204).send();
});

module.exports = router;