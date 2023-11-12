const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/drawings');

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to Mongo');
});

db.on('error', (err) => {
    console.log('Mongo connection Error');
});

const drawingSchema = new mongoose.Schema({
  data: String,
});

const Drawing = mongoose.model('Drawing', drawingSchema);

app.use(express.json());

app.post('/saveDrawing', (req, res) => {
  const { data } = req.body;
  const newDrawing = new Drawing({ data });

  newDrawing.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Drawing saved successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
