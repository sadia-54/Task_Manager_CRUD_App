const express = require('express');
const app = express();
const PORT = 3000;

//using middleware for parsing json requests
app.use(express.json());

//for in-memory storage
let task = [];

//the routes

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description, status } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Get all of the tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Update a task by task ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, status };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).end();
});

// run server
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});

