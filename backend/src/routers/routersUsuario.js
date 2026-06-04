//Inicia a rota para criaçao do usuario
const Usuario = require('../models/modelsUsuario') // Importa o modelo Usuario
const express = require('express')
const router = new express.Router()
const jwt = require('jsonwebtoken') // Importa o JWT para autenticação
const bcrypt = require('bcrypt') // Importa o bcrypt para criptografia de senhas
require('dotenv').config() // Importa o dotenv para usar variáveis de ambiente

//Configurando resposta JSON

router.use(express.json()) // Permite que o Express entenda JSON no corpo das requisições   

router.post('/registro', async (req, res) => {

    const { nome, email, senha, confirmeSenha, role } = req.body // Desestrutura os dados do corpo da requisição

    // Validações
    if(!nome) {
        return res.status(422).json('Nome é obrigatório')
    }
    if(!email) {
        return res.status(422).json('Email é obrigatório')
    }
    if(!senha) {
        return res.status(422).json('Senha é obrigatório')
    }
    if(!confirmeSenha) {
        return res.status(422).json('É obrigatório confirmar a senha')
    }
    if(senha !== confirmeSenha) {
        return res.status(422).json('As senhas não conferem')
    }

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email: email})
    if(usuarioExistente !== null) {
        return res.status(422).json('Já existe um usuário cadastrado com esse email')
    }

    //criação da criptografia da senha
    const salt = await bcrypt.genSalt(12) // Gera um salt para a criptografia
    const senhaCriptografada = await bcrypt.hash(senha, salt) // Criptografa a senha

    const usuario = new Usuario({
        nome,
        email,
        senha: senhaCriptografada, // Armazena a senha criptografada
        role: 'user'
    })

    try {
        await usuario.save() // Salva o usuário no banco de dados
        return res.status(201).json({ message: 'Usuário criado com sucesso!' }) // Retorna sucesso

    }   catch (error) {
            return res.status(500).json({ error: 'Ops! Ocorreu um erro. Tente novamente mais tarde' })
        }
    });
    
    
    // Login do usuário
    
    router.post('/login', async (req, res) => {
        const { email, senha } = req.body // Desestrutura os dados do corpo da requisição   
    
        // Validações
        if(!email) {
            return res.status(422).json('Email é obrigatório')
        }
        if(!senha) {
            return res.status(422).json('Senha é obrigatória')
        }

        // Verifica se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ email: email})
            if(usuarioExistente == null) {
                return res.status(422).json('Faça o cadastro antes de logar')
            }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuarioExistente.senha)
            if(!senhaValida) {
                return res.status(404).json('Senha inválida')
            }
        // Cria o token JWT
        try{

            //.env é um arquivo que esta no projeto mas o coloquei no git ignore para não subir para o github
            // por conta disso cada um deve criar o seu .env com a variável secretToken (EXEMPLO de criaçao de secretToken: secretToken: ALJhedoYUIGHQ2867dQTGE9729ioqq&67WSS677%%FE)
            const secret = process.env.SECRET_TOKEN // Obtém o segredo do token do arquivo .env
            const token = jwt.sign( 
                { id: usuarioExistente._id,
                  role: usuarioExistente.role 
                
                 },
                 secret, { expiresIn: '7d' }) // Cria o token com o ID do usuário e define a expiração para 7 dias
            return res.status(200).json({ message: 'Usuário logado com sucesso!', token: token }) // Retorna sucesso e o token


        }catch (error) {
            return res.status(500).json({ error: 'Ops! Ocorreu um erro. Tente novamente mais tarde' })
        }
    });

    // Middleware para autenticar o token JWT
    const authenticateToken = (req, res, next) => {
     const token = req.headers['authorization'];

     if (!token) res.status(403).json({ error: 'Token não fornecido'});

     jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido'});
        req.user = user
        next(); // Chama o próximo middleware se o token for válido
     });
    };

    // Middleware de autorização por role
const authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });
    if (roles.length && !roles.includes(req.user.role))
      return res.status(403).json({ error: 'Acesso negado' });
    next();
  };
};

// Rota protegida para qualquer usuário logado
router.get('/perfil', authenticateToken, (req, res) => {
  res.json({ message: `Olá ${req.user.nome}`, role: req.user.role });
});


router.get('/protected', authenticateToken ,(req, res) => {
  res.status(200).json({ message: 'Bem-vindo á rota autenticada!'});
});



module.exports = router;
