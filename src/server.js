const express = require('express');
const tasksRouter = require('./route');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ name: "Task API", version: "1.0", endpoints: ["/tasks"] });
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.use('/tasks', tasksRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});