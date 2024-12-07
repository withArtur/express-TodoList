const express = require("express");
const app = express();
const port = 3333;
const todosRouter = require("./routers/todos");

// Middlewares
// const checkTime = require('./middlewares/checkTime');
const corsMiddleware = require("./middlewares/corsMiddleware");
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
app.use(corsMiddleware);


app.get("/", (req, res) => {
    res.send(`Home della API`);
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
    console.log(`Example app listening on port ${port}`);
});