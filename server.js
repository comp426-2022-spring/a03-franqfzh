import minimist from "minimist";
import express from "express";
import { coinFlip, coinFlips, countFlips, flipACoin } from './coin.mjs'

const app = express()

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))


const args = minimist(process.argv.slice(2));
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





app.get('/app/flips/:number',(req, res) => {
    var result = coinFlips(req.params.number)
    var count = countFlips(result)
    res.status(200).json({ 
        'raw': result, 
        'summary': count
    })
})

app.get('/app/flip/call/heads',(req, res) => {
    res.status(200).json(flipACoin('heads'))
})

app.get('/app/flip/call/tails',(req, res) => {
    res.status(200).json(flipACoin('tails'))
})


app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
})

