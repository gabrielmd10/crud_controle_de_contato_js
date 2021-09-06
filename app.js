const express = require('express');
const contato = require('./routes/contatos');

const app = express();

const port = 3000;

app.use(express.urlencoded({extended:true}));

app.listen(port, ()=>{
    console.log(`Servidor executando na porta ${port}`);
});

app.use('/contatos',contato);