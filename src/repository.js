const tasks = [
    { id: 1, title: "Buy milk", done: false },
    { id: 2, title: "Walk the dog", done: true },
    { id: 3, title: "Finish W2 assignment", done: false }
];

let nextId = 4;

function findAll() {
    return tasks;
}

function findById(id) {
    return tasks.find(t => t.id === id);
}

function create(title) {
    const newTask = { id: nextId, title, done: false };
    tasks.push(newTask);
    nextId++;
    return newTask;
}

function update(task, changes) {
    if (changes.title !== undefined) task.title = changes.title;
    if (changes.done !== undefined) task.done = changes.done;
    return task;
}

function remove(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}

module.exports = { findAll, findById, create, update, remove };