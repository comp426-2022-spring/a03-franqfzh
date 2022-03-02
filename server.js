import minimist from "minimist";
import express from "express";

const express = require('express')
const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


const args = minimist(process.argv.slice(2));
const app = express()
const port = args.port || process.env.PORT || 5000;



const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port));
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip': flip})
})


app.get('/app/', (req, res) => {
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

// app.get('/app/echo/:number',express(json), (req, res) => {
//     res.status(200).json({'message': req.params.number})
// })

// app.get('/app/echo/',logging, (req, res) => {
//     res.status(200).json({ 'message': req.query.number})
// })


app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
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




//functions
function coinFlips(number) {
    let results = [];
    for (let i = 0; i < number; i++) {
      results[i] = coinFlip();
    }
    return results
    
  }

function coinFlip() {
    return Math.random() > 0.5 ? 'heads' : 'tails';
}

function countFlips(array) {
    let num_heads = 0;
    let num_tails = 0;

    for(let i = 0; i < array.length; i++) {
    if (array[i] == "heads"){
        num_heads++;
    } else {
        num_tails++;
    }
    }
    if (num_heads==0 && num_tails!=0){
    return {tails: num_tails}
    } else if (num_heads!=0 && num_tails==0){
    return {heads: num_heads}
    } else {
    return {
    heads: num_heads,
    tails: num_tails
    }
}
}

function flipACoin(call) {
    let flip = coinFlip();
    let result;

    if (call == flip) {
        result = "win";
    } else {
        result = "lose";
    }
    return {
        call,
        flip,
        result
    }
    
}