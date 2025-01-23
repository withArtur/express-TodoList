require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    "methods": "GET",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

// Configurations
const port = process.env.PORT ?? 3333;
const todosRouter = require("./routers/todos");

// Middlewares
// const checkTime = require('./middlewares/checkTime');
// const corsMiddleware = require("./middlewares/corsMiddleware");
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

// middleware per il controllo del tempo
// app.use(checkTime);

// middleware per asset statici
// app.use(express.static('public'));

// middleware per il parsing del body
app.use(express.json());
// app.use(express.raw()); // text from v4.17.0+
app.use(express.urlencoded({ extended: false }));

// Add headers before the routes are defined
// app.use(corsMiddleware);


app.get("/", (req, res) => {
    res.type('application/json')
    res.send({ result: 'Home della API' });
});

// app.get("/todos", (req, res) => {
//     res.json([
//         {
//             id: 1,
//             title: 'Primo todo per oggi',
//             completed: false
//         }
//     ]);
// });

// # Router dei post
app.use("/todos", todosRouter);

// Error handler middleware
app.use(errorsHandler)

// Not found middleware
app.use(notFound)

app.listen(port, () => {
    console.log(`Server are listening on port ${port}`);
});