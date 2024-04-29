const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3002;

//connection to mysql
const connection= mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'tasks'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('Connected');

    // con.query('CREATE DATABASE ')
});

//using middleware for parsing json requests
app.use(express.json());

//for in-memory storage
// let task = [];

//the routes

// app.post('/task', (req, res) => {
//     const { Title, Description, Status } = req.body;
//     const addTask = {
//         id: task.length + 1,
//         Title,
//         Description,
//         Status
//     };
//     task.push(addTask);
//     res.status(200).json(addTask);
// });

// Create a new task
app.post('/task', (req, res) => {
    const { Title, Description, Status } = req.body;
    const sql = 'INSERT INTO task (Title, Description, Status) VALUES (?, ?, ?)';
    connection.query(sql, [Title, Description, Status], (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(404).json({ error: 'Internal Server Error' });
        return;
      }
      // here User_ID is the task ID in initial code version
      res.status(200).json({ User_ID: result.insertId, Title, Description, Status });
    });
  });

// Get all of the tasks
app.get('/task', (req, res) => {
    const sql = 'SELECT * FROM task';
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });


// Update a task by task ID
// app.put('/task/:id', (req, res) => {
//     const taskID = parseInt(req.params.id);
//     const { Title, Description, Status } = req.body;
//     const taskIndex = task.findIndex(task => task.id === taskID);
//     if (taskIndex !== -1) {
//         task[taskIndex] = { ...task[taskIndex], Title, Description, Status };
//         res.json(task[taskIndex]);
//     } else {
//         res.status(404).json({ error: 'Task is not found :)' });
//     }
// });


// Update a task by task ID
app.put('/task/:User_ID', (req, res) => {
    const taskId = req.params.User_ID;
    const { Title, Description, Status } = req.body;
    const sql = 'UPDATE task SET Title = ?, Description = ?, Status = ? WHERE User_ID = ?';
    connection.query(sql, [Title, Description, Status, taskId], (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.json({ User_ID: taskId, Title, Description, Status });
    });
  });

// Delete a task by ID
// app.delete('/task/:id', (req, res) => {
//     const taskID = parseInt(req.params.id);
//     task = task.filter(task => task.id !== taskID);
//     res.status(200).end();
// });

// Delete a task by ID
app.delete('/task/:User_ID', (req, res) => {
    const taskId = req.params.User_ID;
    const sql = 'DELETE FROM task WHERE User_ID = ?';
    connection.query(sql, taskId, (err, result) => {
      if (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(200).end();
    });
  });

// run server
app.listen(port, () => {
    console.log('Server is running on port 3002');
});

