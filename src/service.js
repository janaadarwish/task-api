const repo = require('./repository');

function getAllTasks() {
    return repo.findAll();
}

function getTaskById(id) {
    return repo.findById(id);
}

function createTask(title) {
    if (!title || title.trim() === "") {
        return { error: "Field 'title' is required and cannot be empty" };
    }
    return { data: repo.create(title.trim()) };
}

function updateTask(id, body) {
    const task = repo.findById(id);
    if (!task) return { notFound: true };

    const { title, done } = body || {};

    if (title === undefined && done === undefined) {
        return { error: "Provide at least 'title' or 'done' to update" };
    }

    if (title !== undefined && (typeof title !== 'string' || title.trim() === "")) {
        return { error: "Field 'title' cannot be empty" };
    }

    const changes = {};
    if (title !== undefined) changes.title = title.trim();
    if (done !== undefined) changes.done = Boolean(done);

    return { data: repo.update(task, changes) };
}

function deleteTask(id) {
    return repo.remove(id);
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };