const express = require("express");
const app = express();
const port = 3000;
// const postsRouter = require("./routers/posts");

// Middlewares
// const checkTime = require('./middlewares/checkTime');
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

// middleware per il controllo del tempo
// app.use(checkTime);

// middleware per asset statici
// app.use(express.static('public'));

// middleware per il parsing del body
// app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'); // http://localhost:8888

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get("/", (req, res) => {
    res.send(`Home della API`);
});

app.get("/todos", (req, res) => {
    res.json([
        {
            id: 1,
            title: 'Primo todo per oggi',
            completed: false
        }
    ]);
});


// # Router dei post
// app.use("/todos", todosRouter);

// Error handler middleware
app.use(errorsHandler)

// Not found middleware
app.use(notFound)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});