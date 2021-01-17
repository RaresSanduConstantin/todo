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

app.get("/", (req, res) => {
  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    console.log(obj);
    res.status(200).json(obj);
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);
      // todos.push(response.data)
      // res.status(201).json(todos[0])
    })
    .catch(function (error) {
      console.log(error);
      res.json("Error occured!");
    });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync("myjsonfile.json");
  const json = JSON.parse(data);
  //    const todos = json
  const d = json.filter((todo) => {
    return todo.id !== id;
  });
  console.log(d);
  fs.writeFileSync("myjsonfile.json", JSON.stringify(d, null, 2));

  res.json({ message: "todo removed" });
});

app.put("/:id", (req, res) => {
  const { completed } = req.body;
  console.log("completed: ", completed);
  const id = req.params.id;
  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    const todosList = JSON.parse(data);
    todosList.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = completed;
      }
    });

    fs.writeFile("myjsonfile.json", JSON.stringify(todosList), (err) => {
      if (err) throw err;
      console.log("Data updated to file");
      res.status(201).json(todosList);
    });
  });
});

app.post("/", (req, res) => {
  const newTodo = {
    userId: req.body.userId,
    id: uuidv4(),
    title: req.body.title,
    completed: req.body.completed,
  };

  fs.readFile("myjsonfile.json", "utf8", (err, data) => {
    const todos = JSON.parse(data);
    todos.push(newTodo);
    const json = JSON.stringify(todos);

    fs.writeFile("myjsonfile.json", json, (err) => {
      if (err) throw err;
      console.log("Data writen to file");
      res.status(201).json(todos);
    });
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
