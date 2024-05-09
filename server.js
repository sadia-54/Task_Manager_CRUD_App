const express = require('express');
const app = express();
const port = 3001; //running on port 3001


//using middleware for parsing json requests
app.use(express.json());

//for in-memory storage
let task = [];

//the routes

// Create a new task
app.post('/task', (req, res) => {
    const { Title, Description, Status } = req.body;
    const addTask = {
        id: task.length + 1,
        Title,
        Description,
        Status
    };
    task.push(addTask);
    res.status(200).json(addTask);
});


// Get all of the tasks
app.get('/task', (req, res) => {
  res.json(task);
});


// Update a task by task ID
app.put('/task/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    const { Title, Description, Status } = req.body;
    const taskIndex = task.findIndex(task => task.id === taskID);
    if (taskIndex !== -1) {
        task[taskIndex] = { ...task[taskIndex], Title, Description, Status };
        res.json(task[taskIndex]);
    } else {
        res.status(404).json({ error: 'Task is not found :)' });
    }
});


// Delete a task by ID
app.delete('/task/:id', (req, res) => {
    const taskID = parseInt(req.params.id);
    task = task.filter(task => task.id !== taskID);
    res.status(200).end();
});


// run server
app.listen(port, () => {
    console.log('Server is running on port 3001');
});

