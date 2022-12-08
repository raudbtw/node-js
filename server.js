const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const { json } = require('express');

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log('Server started at port :3000');
});


app.get('/users', (req, res) => {
  const users = fs.readFileSync('users.json');
  return res.send(users);
});

app.delete('/users/:id', (req, res) => {
  const id = req.params['id'];

  const users = fs.readFileSync('users.json');
  const data = JSON.parse(users);

  const index = data.findIndex((item) => item.id == id);

  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('users.json', JSON.stringify(data));
    return res.send({ message: 'User has deleted' });
  } else {
    return res.status(400).send(`user id:${id} not found`);
  }
});

app.post('/users', (req, res) => {
  const users = fs.readFileSync('users.json');
  const data = JSON.parse(users);
  const id = data.length === 0 ? 1 : data.at(-1).id + 1;
  const newUser = {
    id,
    ...req.body,
  };
  data.push(newUser);
  fs.writeFileSync('users.json', JSON.stringify(data));
  return res.send(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = req.params['id'];
  const name = req.body.name;
  const age = req.body.age;

  const users = fs.readFileSync('users.json');
  const data = JSON.parse(users);

  const index = data.findIndex((item) => item.id == id);

  if (index !== -1) {
    data[index].name = name;
    data[index].age = age;
    fs.writeFileSync('users.json', JSON.stringify(data));
    return res.send({ message: `user ${id} has updated` });
  } else {
    return res.status(400).send(`user id:${id} not found`);
  }
});
