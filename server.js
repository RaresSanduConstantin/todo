const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const axios = require("axios");
app.use(cors());

// Middleware for data on post req
app.use(express.json({ extended: false }));

const todos = [];

// Route to get all the todos
app.get("/", (req, res) => {
  // Read the json file and send the parsed data
  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj);
    res.status(200).json(obj);
  });
});

// Route to post a todo
app.post("/", (req, res) => {
  // Get from body the data
  const newTodo = {
    userId: req.body.userId,
    id: uuidv4(),
    title: req.body.title,
    completed: req.body.completed,
  };

  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    // Push to todos array the new todo
    const todos = JSON.parse(data);
    todos.push(newTodo);
    const json = JSON.stringify(todos);

    // Write the data to json file
    fs.writeFile("myjsonfile.json", json, (err) => {
      if (err) throw err;
      console.log("Data writen to file");
      res.status(201).json(todos);
    });
  });
});

// Route to delete a todo by id
app.delete("/:id", (req, res) => {
  // Get the id
  const id = req.params.id;
  const data = fs.readFileSync("myjsonfile.json");
  const json = JSON.parse(data);

  // Filter the todos without the one we get from req.params
  const d = json.filter((todo) => {
    return todo.id !== id;
  });
  console.log(d);

  // Rewrite the json file
  fs.writeFileSync("myjsonfile.json", JSON.stringify(d, null, 2));

  res.json({ message: "todo removed" });
});

// Route to update the todos by id
app.put("/:id", (req, res) => {
  // Get the completed atribute and the id from body and req.params
  const { completed } = req.body;
  console.log("completed: ", completed);
  const id = req.params.id;

  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    // Get the parsed data
    const todosList = JSON.parse(data);
    // For the todo with matched id change the completed atribute
    todosList.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = completed;
      }
    });

    // Rewrite the file with the new array
    fs.writeFile("myjsonfile.json", JSON.stringify(todosList), (err) => {
      if (err) throw err;
      console.log("Data updated to file");
      res.status(201).json(todosList);
    });
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
