const express = require('express');
const app = express();

// use port number stored in env or use 3000
const PORT = process.env.PORT || 3000;

// most basic route
app.get('/', (req, res) => {
  res.send('welcome to jukeboxd');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
