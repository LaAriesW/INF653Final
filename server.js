require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./routes/routes')

const app = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my Event Ticketing System app!');
})

app.use((req, res, next) => {
     const accepts = req.headers.accept || '';

    if (accepts.includes('text/html')) {
        return res.status(404).send('<h1>404 Not Found</h1>');
    }

    res.status(404).json({ error: '404 Not Found' });
})


mongoose.connect(process.env.MongoDB)
    .then(() => {
        app.listen(port, (()=> {
            console.log(`Server is running at http://localhost:${port}`);
        }));
    })
