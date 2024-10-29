const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const app = express()
const cors = require('cors');

const usersController = require('./controllers/usersController');
const productTypeController = require('./controllers/productTypeController');
const profileController = require('./controllers/profileController');
const supplierController = require('./controllers/supplierController');
const clientController = require('./controllers/clientController');
const productController = require('./controllers/productController');
const transactionController = require('./controllers/transactionController');
require('dotenv').config()

const db = require('./config/database')


const xuxu = (value) =>  JSON.parse(JSON.stringify(value, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ));

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.get('/', async (req, res) => {
    const u = await db.query('select * from users');
    // const sql = `
        // SELECT
            // u.id,
            // u.name,
            // u.password,
            // system_id
        // FROM users as u
    // `;

    // const has_user = await db.query(sql)
//   res.json(has_user.rows)
res.json({xa: 1, u: JSON.parse(JSON.stringify(u, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ))})  
})
app.get('/api/is-loggedin', async (req, res) => {
    res.send(true);
})

// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('sam');
//     const sql = `
//         SELECT
//             u.id,
//             u.name,
//             u.email
//         FROM users as u
//         where email = ? and password = ?
//     `

//     // todo - fazer criptografia de senha
//     try {
//         const data = await db.query(sql, [email, password])
//         if (data.length > 0) {
//             res.json(xuxu({
//                 user_id: data[0].id,
//                 user_name: data[0].name,
//                 token: data[0].email, // todo - enviar jwt token
//             }))

//         } else {
//             res.status(500).json({ error: 'Credenciais invalidas' });
//         }
//       } catch (err) {
//         res.status(500).json({ error: 'Teste', message: err.message });
//       }
// })

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Recebendo dados para login:', { email, password });

    const sql = `
        SELECT
            u.id,
            u.name,
            u.email
        FROM users as u
        where email = ? and password = ?
    `;

    try {
        // Log antes de fazer a consulta SQL
        console.log("Executando consulta SQL para verificar usuário...");

        // Executando a consulta no banco de dados
        const data = await db.query(sql, [email, password]);

        // Log do resultado da consulta
        console.log("Resultado da consulta SQL:", data);

        if (data.length > 0) {
            console.log("Login bem-sucedido para o usuário:", data[0].id);

            // Resposta de sucesso com os dados do usuário
            res.json(xuxu({
                user_id: data[0].id,
                user_name: data[0].name,
                token: data[0].email, // TODO - enviar jwt token no futuro
            }));
        } else {
            console.log("Credenciais inválidas para o usuário:", email);
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (err) {
        // Log para capturar qualquer erro que ocorra no bloco try
        console.error("Erro ao processar o login:", err.message);
        res.status(500).json({ error: 'Erro no servidor', message: err.message });
    }
});


app.get('/api/users', usersController.index)
app.get('/api/users/:id', usersController.show)
app.post('/api/users', usersController.save)
app.delete('/api/users/:id', usersController.destroy)

app.get('/api/profile', profileController.index)
app.post('/api/profile', profileController.save)

app.get('/api/product-type', productTypeController.index)
app.get('/api/product-type/:id', productTypeController.show)
app.post('/api/product-type', productTypeController.save)
app.delete('/api/product-type/:id', productTypeController.destroy)

app.get('/api/fornecedores', supplierController.index)
app.get('/api/fornecedores/tipos-documento', supplierController.documents)
app.get('/api/fornecedores/:id', supplierController.show)
app.post('/api/fornecedores', supplierController.save)
app.delete('/api/fornecedores/:id', supplierController.destroy)

app.get('/api/clientes', clientController.index)
app.get('/api/clientes/tipos-documento', clientController.documents)
app.get('/api/clientes/:id', clientController.show)
app.post('/api/clientes', clientController.save)
app.delete('/api/clientes/:id', clientController.destroy)

app.get('/api/produtos', productController.index)
app.get('/api/produtos/fornecedores', productController.clients)
app.get('/api/produtos/tipos', productController.types)
app.get('/api/produtos/:id', productController.show)
app.post('/api/produtos', productController.save)
app.delete('/api/produtos/:id', productController.destroy)

app.get('/api/transacoes', transactionController.index)
app.get('/api/transacoes/produtos', transactionController.produtos)
app.get('/api/transacoes/clientes', transactionController.clients)
app.get('/api/transacoes/status', transactionController.status)
app.get('/api/transacoes/:id', transactionController.show)
app.post('/api/transacoes', transactionController.save)
app.delete('/api/transacoes/:id', transactionController.destroy)

app.listen(3000)
