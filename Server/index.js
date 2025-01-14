const express = require('express')
const cors = require('cors')
const app = express()
const port = 34899

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('This is a EmpDev service. :D')
})

const routes = require('./routes/index')(app);
console.log(routes);

routes.forEach(route => {
    route(app)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
    