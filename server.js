const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();

const port = 3001;
const port2 = 443;

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/upload', (req, res) =>{
    const file = req.body.file;
    const name = req.body.name;

    const binaryData = new Buffer(file.replace(/^data:image\/png;base64,/,""), 'base64').toString('binary');
    fs.writeFile("public/"+name, binaryData, "binary", (err) => {
        console.log(err);
    })

    res.json({result:'ok', port: port2});
});

app.use(express.static(__dirname + '/public'));

var server=app.listen(port2,function(){
    console.log('Servidor web iniciado');
});

app.listen(port, () => console.log('server ready'));
