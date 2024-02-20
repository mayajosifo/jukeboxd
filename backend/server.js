const express = require('express');
const app = express();

// use port number stored in env or use 3000
const PORT = process.env.PORT || 3000;

// route (works based on user requests and site responses)
// this route starts at the root/main entry point of the website
app.get('/', (req, res) => {

    // sends a response that says 'welcome to jukeboxd'
  res.send('welcome to jukeboxd');

});

// tells the app to begin listening to requests from the specified port number
app.listen(PORT, () => {
    // this message is just here to let you know the server started successfully
  console.log(`Server is running on port ${PORT}`);
});
