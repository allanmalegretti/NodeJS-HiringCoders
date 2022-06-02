const http = require('http');
const url = require('url');
const fs = require('fs');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    let resposta;
    const urlparse = url.parse(req.url, true)

    const params = queryString.parse(urlparse.search);
    console.log(params);

    // var fs = require('fs');

    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    resposta = 'Usuario criado com sucesso';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//http://localhost:3000/criar-usuario?nome=allan&idade=36&id=1
//http://localhost:3000/selecionar-usuario?id=2