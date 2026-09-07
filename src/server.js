const express = require('express');

const app = express();
app.use(express.json());  // needed later for reading POST/PUT bodies

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

const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});