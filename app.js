const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const JSONdb = require('simple-json-db');
const db = new JSONdb('./banana-db.json');

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/api/user/hash', async (req, res) => {
    if (db.has(req.body.email)) {
        res.send({hash : db.get(req.body.email)})
    } else {
        res.send({ code: 404 })
    }
})


app.post('/api/user/login', async (req, res) => {
    if (db.has(req.body.email)) {
        console.log(req.body)
        if (req.body.password === db.get(req.body.email)) {
            res.send({ code: 200 })
        } else {
            res.send({ code: 404 })
        }
    } else {
        res.send({ code: 404 })
    }
})

app.post('/api/user/register', async (req, res) => {

    if (!db.has(req.body.email)) {
        db.set(req.body.email, req.body.password);
        res.send({ code: 200 });
        db.get(req.body.email);
    }
    else {
        res.send({ code: 404 });
    }
})

app.listen(3000, () => console.log('banana server running on port 3000!'))