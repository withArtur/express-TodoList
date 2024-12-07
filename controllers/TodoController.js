// Importiamo i todo, in modo che sia visibile a tutti
const todos = require('../database/todos');

// Index
function index(req, res) {
    let filteredTodos = todos;

    // filtra stato del todo
    if (req.query.completed) {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    res.json(filteredTodos);
}

function show(req, res) {
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
    console.log(todos); // Controlliamo i todos

    // Restituiamo lo status corretto e il todo appena creato
    res.status(201);
    res.json(newTodo);
}

function update(req, res) {
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
    todo.completed = req.body.completed;

    // Controlliamo i todos
    console.log(todos);

    // Restituiamo il todo appena aggiornato
    res.json(todo);
}

function modify(req, res) {
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

    // Controlliamo i todos
    console.log(todos);

    // Restituiamo il todo appena aggiornato
    res.json(todo);
}

function destroy(req, res) {
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

    // Rimuoviamo  il todo dall'array
    todos.splice(todos.indexOf(todo), 1);

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