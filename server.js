const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import {coinFlip, coinFlips, countFlips, flipACoin} from './coin.mjs'

const logging = (req, res, next) => {
    console.log(req.body.number)
    next()
}

var port = 4000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port));
})

app.get('/app/flip', (req, res) => {
    var flip = coinflip()
    res.status(200).json({'flip': flip})
})


app.get('/app', (req, res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

app.get('/app/echo/:number',express(json), (req, res) => {
    res.status(200).json({'message': req.params.number})
})

app.get('/app/echo/',logging, (req, res) => {
    res.status(200).json({ 'message': req.query.number})
})

app.use(function(req, res){
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})

app.get('/app/flip',(req, res) => {
    res.status(200).json({ 'flip': coinFlip()})
})

app.get('/app/flips/:number',(req, res) => {
    var result = coinFlips(req.params.number)
    var count = countFlips(result)
    res.status(200).json({ 
        'raw': result, 
        'summary': count
    })
})

app.get('/app/flip/call/heads',(req, res) => {
    res.status(200).json(flipACoin(HEADS))
})

app.get('/app/flip/call/tails',(req, res) => {
    res.status(200).json(flipACoin(TAILS))
})