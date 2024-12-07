// Importiamo i todo, in modo che sia visibile a tutti
const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', '/database/Todos.json');

/**
 * Funzione per leggere i todo nel file
 */
const readTodos = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Se il file non esiste o è vuoto, ritorna un array vuoto
    }
};

/**
 * Funzione per scrivere i todo nel file
 */
const writeTodos = (todos) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
};


// Index
function index(req, res) {
    let filteredTodos = readTodos();

    // filtra stato del todo
    if (req.query.completed) {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    res.json(filteredTodos);
}

function show(req, res) {
    const todos = readTodos();

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo il todo tramite id
    const todo = todos.find(todo => todo.id === id);

    // Piccolo controllo
    if (!todo) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Todo non trovato"
        });
    }

    // Restituiamolo sotto forma di JSON   
    res.json(todo);
}

function store(req, res) {
    const todos = readTodos();
    console.log(todos);

    // Creiamo un nuovo id incrementando l'ultimo id presente
    const newId = todos[todos.length - 1].id + 1;

    console.log('POST Request body: ', req.body);

    // Creiamo un nuovo oggetto todo
    const newTodo = {
        id: newId,
        title: req.body.title,
        completed: false, // req.body.completed always false on create
    }

    console.log('newTodo: ', newTodo)

    // Aggiungiamo il nuovo todo ai todos
    todos.push(newTodo);
    writeTodos(todos);
    console.log(todos); // Controlliamo i todos

    // Restituiamo lo status corretto e il todo appena creato
    res.status(201);
    res.json(newTodo);
}

function update(req, res) {
    const todos = readTodos();

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il todo tramite id
    const todo = todos.find(todo => todo.id === id);

    // Piccolo controllo
    if (!todo) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Todo non trovato"
        })
    }

    // Aggiorniamo il todo
    todo.title = req.body.title;
    todo.completed = req.body.completed == 'true' ? true : false;

    // Salviamo le todos
    writeTodos(todos);
    console.log(todos);

    // Restituiamo il todo appena aggiornato
    res.json(todo);
}

function modify(req, res) {
    const todos = readTodos();
    console.log('Toggle stato check del todo ' + req.params.id);

    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id)

    // cerchiamo il todo tramite id
    const todo = todos.find(todo => todo.id === id);

    // Piccolo controllo
    if (!todo) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Todo non trovato"
        })
    }

    // Aggiorniamo il todo
    todo.completed = !todo.completed;

    // Salviamo i todos
    writeTodos(todos);
    console.log(todos);

    // Restituiamo il todo appena aggiornato
    res.json(todo);
}

function destroy(req, res) {
    const todos = readTodos();
    // recuperiamo l'id dall' URL e trasformiamolo in numero
    const id = parseInt(req.params.id);

    // cerchiamo il todo tramite id
    const todo = todos.find(todo => todo.id === id);

    // Piccolo controllo
    if (!todo) {
        res.status(404);

        return res.json({
            error: "Not Found",
            message: "Todo non trovato"
        })
    }

    // Rimuoviamo il todo dall'array
    todos.splice(todos.indexOf(todo), 1);

    // Salviamo i todos
    writeTodos(todos);

    // Restituiamo lo status corretto
    res.sendStatus(204)
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
};