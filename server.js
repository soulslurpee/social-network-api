const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });

mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});