const Usuario = require('../models/modelsUsuario');
const bcrypt = require('bcrypt');
const express = require('express');
const router = new express.Router();
const jwt = require('jsonwebtoken');

// Middleware para autenticar o token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido ou formato inválido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Middleware de autorização por role
const authorize = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Usuário não autenticado' });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};

// Rota para criar um administrador  
//router.post('/criar-admin', authenticateToken, authorize('admin'), async (req, res) => { 
router.post('/criar-admin', async (req, res) => {
  try {
    const emailAdmin = process.env.DB_ADMIN_EMAIL;
    const senhaAdmin = process.env.DB_ADMIN_PASSWORD; 
    const nomeAdmin = process.env.DB_ADMIN_USER;

    const adminExistente = await Usuario.findOne({ email: emailAdmin });
    if (adminExistente) {
      return res.status(400).json({ error: 'Administrador já existente' });
    }

    const senhaCriptografada = await bcrypt.hash(senhaAdmin, 12);

    const admin = new Usuario({
      nome: nomeAdmin,
      email: emailAdmin,
      senha: senhaCriptografada,
      role: 'admin',
    });

    await admin.save();

    res.status(201).json({ message: 'Administrador criado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar administrador' });
  }
});

// Rota de confirmação para administradores
router.get('/admin', authenticateToken, authorize('admin'), (req, res) => {
  res.json({ message: 'Bem-vindo, administrador!' });
});

module.exports = router;