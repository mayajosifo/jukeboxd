const express = require('express');
const app = express();

const reviewRoutes = require('./routes/reviews')

// use port number stored in env or use 3000
const PORT = process.env.PORT || 3000;

app.use(express.json())

// middleware2
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// route (works based on user requests and site responses)
// this route starts at the root/main entry point of the website
app.use('/api/reviews', reviewRoutes)



//Routes to add
/*Get 
By album
By artist
By reviewID

Post
Only album posts allowed for now
Put
By ReviewID (wait until authentication/login complete)

Delete
By reviewID
*/

// tells the app to begin listening to requests from the specified port number
app.listen(PORT, () => {
    // this message is just here to let you know the server started successfully
  console.log(`Server is running on port ${PORT}`);
});

//TODO: set up Postman or some other method of testing routes on our API
