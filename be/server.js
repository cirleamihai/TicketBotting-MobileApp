const express = require('express'); // Importing express
const app = express();
const eventsRouter = require('./routes/events.js');

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/events', eventsRouter); // Mounting the events router

app.get('/', (req, res) => {
    res.send({
        message: 'Hello from the server! Available routes are: /events'
    });
});

app.listen(5050, () => {
        console.log('Server is running on port 5050');
});

