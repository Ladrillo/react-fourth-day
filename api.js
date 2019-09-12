const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const fruits = ['pear', 'mango', 'banana', 'kiwi'];
const meats = ['beef', 'chicken', 'fish'];

const friends = [
  { id: '1', name: 'gabe', email: 'gabe@gabe.com', age: 42 },
  { id: '2', name: 'luke', email: 'luke@luke.com', age: 32 },
  { id: '3', name: 'tom', email: 'tom@tom.com', age: 44 },
  { id: '4', name: 'samar', email: 'samar@samar.com', age: 22 },
  { id: '5', name: 'delba', email: 'delba@delba.com', age: 25 },
  { id: '6', name: 'emily', email: 'emily@emily.com', age: 24 },
];

app.get('/market/fruits', (req, res) => {
  res.json(fruits);
});

app.get('/market/meats', (req, res) => {
  res.json(meats);
});

app.get('/friends/:id/name', (req, res) => {
  const friend = friends.find(fr => fr.id === req.params.id);
  if (!friend) {
    res.json('No such friend!')
  }
  else {
    res.json(friend.name);
  }
});

app.get('/friends/:id', (req, res) => {
  const friend = friends.find(fr => fr.id === req.params.id);
  if (!friend) {
    res.json('No such friend!')
  }
  else {
    res.json(friend);
  }
});

app.get('/friends', (req, res) => {
  res.json(friends);
});

app.listen(4000, () => {
  console.log('listening on 4000');
});