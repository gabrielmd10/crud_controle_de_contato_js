const express = require('express');
const db = require('../db/connection');

const router = express.Router();

//rota para testar o funcionamento do recurso
router.get('/teste', (req, res)=>{
    res.status(200).send("rota teste ok!!!");
});

//esse é um código que mostra os error caso tenha algum problema no banco
process.on('warning', (warning) => {
    console.log(warning.stack);
});

//rota para incluir as informações na tabela agenda em connection na linha database
//id é autoincremento não é necessário passar seu parâmetro
router.post('/addcontato', (req, res)=>{
    let {nome, email} = req.body;

    let cmd_insert = `insert into agenda (nome, email) values('${nome}','${email}')`;

    console.log(cmd_insert);

    db.query(cmd_insert, (error, result)=>{
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(201).send('contato gravado com sucesso');
        }
    });

});

//rota para pesquisar informações por id
router.get('/selcontato/:id', (req, res)=>{
    let id = req.params.id;

    let cmd_select = `select nome, email from agenda where id = ${id}`;

    console.log(cmd_select);

    db.query(cmd_select, (error, result)=>{
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send(result);
        }
    });
});

//rota para pesquiar todas as informações do banco de dados
router.get('/selcontatoall',(req, res)=>{
    let email = req.body.email ;

    let cmd_select = `select id,nome, email from agenda where email like '%${email}%'`;

    db.query(cmd_select, (error, result)=>{
        if(error){
            return res.status(400).send(error);
        }else{
            return res.status(200).send(result);
        }
    });
});

//rota para excluir o contato por id
router.delete('/delcontato/:id',(req, res)=>{
    let id = req.params.id;
    let cmd_delete = `delete from agenda where id = ${id}`;

    db.query(cmd_delete, (error, result)=>{
       if(error){
           return res.status(400).send(error);
       } else{
        if(result.affectedRows>0){
            return res.status(200).send({message: "Excluí­do com sucesso"});
        }else{
            return res.status(204).send();
        }
           
       }
    });
});

//rota para alterar o contato
router.put('/updcontato/:id', (req, res)=>{
    let id = req.params.id;
    let {email, nome} = req.body;

    let cmd_update = `update agenda set email = '${email}', nome = '${nome}' where id = ${id}`;

    console.log(cmd_update);

    db.query(cmd_update,(error,result)=>{
        if(error){
            return res.status(400).send(error);
        }else{
            if(result.affectedRows>0){
                return res.status(200).send('Agenda alterada com sucesso!');
            }else{
                return res.status(204).send();
            }
        }
    });

});

module.exports = router;