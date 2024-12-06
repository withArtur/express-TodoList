function errorsHandler(err, req, res, next) {
    res.status(500)
    res.json({
        message: 'Errore del server',
        success: false,
        error: err.message
    });
};

module.exports = errorsHandler;