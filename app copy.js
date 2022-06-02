const http = require('http');
const url = require('url');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    const params = queryString.parse(url.parse(req.url, true).search);
    // console.log(params);

    let resposta;

    if(params.pergunta == 'melhor-saga'){
        resposta = 'Star Wars';
        console.log(resposta);
    } else if (params.pergunta == 'melhor-trilogia'){
        resposta = 'Senhor dos Anéis';
        console.log(resposta);
    } else {
        resposta = 'Pergunta errada';
        console.log(resposta);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
    // res.end(params.pergunta);
    res.end(resposta);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});