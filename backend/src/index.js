// imports
require('dotenv').config({path: '../.env'}) // Importa o .env para usar variáveis de ambiente
const express = require('express')
const mongoose = require('mongoose')
const Filme = require('./models/modelsFilme') // Importa o modelo Filme
const Carrinho = require('./models/modelsCarrinho') // Importa o modelo Carrinho
const routersFilme = require('./routers/routersFilme') // Importa a rota GET geral dos filmes
const routersUsuario = require('./routers/routersUsuario') // Importa as rotas de autenticação do usuário
const routersCarrinho = require('./routers/routersCarrinho') // Importa as rotas GET POST e DELETE do carrinho
const routersHome = require('./routers/routersHome') // Importa a rota GET da home
const routersAdmin = require('./routers/routersAdmin'); // Importa as rotas de autentificação do admin
const jwt = require('jsonwebtoken') // Importa o JWT para autenticação
const bcrypt = require('bcrypt') // Importa o bcrypt para criptografia de senhas

const app = express()
// const cors = require('cors'); // add
const port = 3000
// app.use(cors()); // add

app.use(express.json()) // Permite que o Express entenda JSON no corpo das requisições

const dbUser = process.env.DB_USER // Obtém o usuário do banco de dados do arquivo .env
const dbPassword = process.env.DB_PASSWORD // Obtém a senha do banco de dados do arquivo .env

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@grupo2db.hurakc7.mongodb.net/carrinho-api?retryWrites=true&w=majority&appName=grupo2db`)
  .then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso!')

    app.use(routersFilme) // Usa a rota que está no arquivo routersFilme.js
    app.use(routersCarrinho) // Usa as rotas que estão no arquivo routersCarrinho.js
    app.use(routersHome) // Usa a rota que está no arquivo routersHome.js
    app.use(routersUsuario) // Usa as rotas que estão no arquivo routersUsuario.js
    app.use(routersUsuario) // Usa as rotas que estão no arquivo routersUsuario.js
    app.use(routersAdmin); // Usa as rotas que estão no arquivo routersAdmin.js

    // Só inicia o servidor depois de conectar no MongoDB
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`)
    })
  })
  .catch((error) => {
    console.error('Erro ao conectar no MongoDB:', error)
    console.log('Usuário:', process.env.DB_USER);
    console.log('Senha:', process.env.DB_PASSWORD);
    console.log('Usuário Admin:', process.env.DB_ADMIN_USER);
    console.log('Senha Admin:', process.env.DB_ADMIN_PASSWORD);
    console.log('Email Admin:', process.env.DB_ADMIN_EMAIL);
  })