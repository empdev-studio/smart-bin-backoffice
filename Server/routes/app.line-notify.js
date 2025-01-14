module.exports = (app) => {
    app.get('/send-notify', (req, res) => {
        res.send('it\'s work!')
    })
}