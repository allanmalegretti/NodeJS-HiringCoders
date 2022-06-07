const http = require('http');
const url = require('url');
const fs = require('fs');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

    var resposta;
    const urlparse = url.parse(req.url, true)
    const params = queryString.parse(urlparse.search);
    console.log(params);

    // Criar usuario
    // http://localhost:3000/criar-atualizar-usuario?nome=allan&idade=36&id=1
    if (urlparse.pathname == '/criar-atualizar-usuario') {
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
            if (err) throw err;
            console.log('Criado!');
            resposta = 'Usuario criado/atualizado com sucesso!';

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });

        // Selecionar usuario
        // http://localhost:3000/selecionar-usuario?id=1
    } else if (urlparse.pathname == '/selecionar-usuario') {
        fs.readFile('users/' + params.id + '.txt', function (err, data) {
            console.log('Selecionado!');
            resposta = data;

            res.statusCode = 200;
            // res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });

        // Remover usuario
        // http://localhost:3000/remover-usuario?id=1
    } else if (urlparse.pathname == '/remover-usuario') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            if (err) throw err;
            console.log('Deletado!');
            resposta = err ? "Usuario nao encontrado." : "Usuario removido.";

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            // res.setHeader('Content-Type', 'application/json');
            res.end(resposta);
        });
    }

    // console.log(resposta);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});