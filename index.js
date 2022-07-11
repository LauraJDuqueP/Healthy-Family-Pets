const express = require('express');
let users = require('./mock/users');
let pets = require('./mock/pets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// let pets = [];

// let users = [
//   { user: 'laura', password: '123', mail: 'lau@pets' },
//   { user: 'jose', password: '456', mail: 'jose@pets' },
// ];

app.get('/pets', (req, res) => {
  res.json({ pets });
});

app.get('/login', (req, res) => {
  const body = req.body;
  const find_user = users.find((user) => user.user === body.user);
  if (find_user) {
    if (find_user.password === body.password) {
      res.json({ message: 'you are logged in' });
    } else {
      res.json({ message: 'invalid data' });
    }
  } else {
    res.json({ message: 'invalid data' });
  }
});

app.post('/register', (req, res) => {
  const body = req.body;
  const newUser = { body };
  users.push(newUser);
  res.json({ message: `user -${body.user}-  has been successfully created` });
});

app.post('/pets', (req, res) => {
  const body = req.body;
  const newPet = { id: Math.random() + '', name: body.name, breed: body.breed }; // ...body --- aqui si le mando la edad o lo que le mande van a caer esos datos
  pets.push(newPet);
  res.json({ id: newPet.id });
});

app.get('/pets/:id', (req, res) => {
  const { id } = req.params;
  const pet = pets.find((pet) => pet.id === id);
  if (id) {
    res.json({ message: 'your pet is ', data: pet });
  } else {
    res.json({ message: 'invalid data' });
  }
  console.log(pets);
});

app.put('/pets/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  pets = pets.map((pet) => {
    if (pet.id === id) {
      return { ...pet, ...body };
    } else {
      return pet;
    }
  });
  res.json({ message: 'successfully edited' });
});

app.delete('/pets/:id', (req, res) => {
  const { id } = req.params;
  pets = pets.filter((pet) => pet.id !== id);
  res.json({ message: 'successfully removed' + id });
});

app.listen(port, () => {
  console.log('Healthy Family Pets' + port);
});
// mi repo en github https://limitless-cliffs-52530.herokuapp.com/ | https://git.heroku.com/limitless-cliffs-52530.git
