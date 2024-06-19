const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    const query = User.findOne({'email': email});
    query.select('nome senha favoritos');
    const user = await query.exec();

    if (email == '') {
        res.render("index", {feedback: "É obrigatório preencher todos os campos."});
        return;
    }

    if (user === null) {
        res.render("index", {feedback: `Nenhum usuário com o e-mail '${email}' encontrado.`});
        return;
    }

    if (senha != user.senha) {
        res.render("index", {feedback: `A senha para ${user.nome} está incorreta.`});
        return;
    }

    req.session.login = email;
    res.redirect('/');
});

router.post('/logout', (req, res) => {
    console.log('-------------------------------');
    console.log('Destruindo sessão agora');
    req.session.destroy();
    console.log(req.session?.login);
    console.log('-------------------------------');

    res.redirect('index');
});

router.post('/signup', async (req, res) => {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const nascimento = req.body.nascimento;
    const senha = req.body.senha;
    const senha2 = req.body.senha2;
    const email = req.body.email;

    const query = User.findOne({'email': email});
    query.select('email');
    const user = await query.exec();

    if (
        nome == '' ||
        sobrenome == '' ||
        nascimento == '' ||
        senha == '' ||
        senha2 ==  '' ||
        email == ''
    ) {
        res.render('cadastro', { feedback: 'Todos os campos precisam ser preenchidos obrigatoriamente.' });
        return;
    }

    if (user !== null) {
        res.render('cadastro', {feedback: 'Uma conta com este e-mail já está cadastrada!'});
        return;
    }

    if (senha != senha2) {
        res.render('cadastro', {feedback : 'As senhas não coincidem'});
        return;
    }

    const newUserData = {
        nome: nome,
        sobrenome: sobrenome,
        nascimento: nascimento,
        senha: senha,
        email: email,
    };

    const newUser = await User.insertMany(newUserData);

    console.log(newUser);

    req.session.login = email;

    res.redirect('/');
});

router.post('/password', async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const senha2 = req.body.senha2;

    const query = User.findOne({'email': email});
    query.select('email senha');
    const user = await query.exec();

    if (
        senha == '' ||
        senha2 ==  '' ||
        email == ''
    ) {
        res.render('senha', { feedback : 'Todos os campos precisam ser preenchidos obrigatoriamente.' });
        return;
    }

    if (user === null) {
        res.render('senha', { feedback : 'Não foi possível encontrar um usuário com este e-mail.' });
        return;
    }

    if (senha != senha2) {
        res.render('senha', { feedback : 'As senhas não coincidem' });
        return;
    }

    await User.updateOne({'email': email}, {'senha': senha});

    res.redirect('/');
});

module.exports = router;
