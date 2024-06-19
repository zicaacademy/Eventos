const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('index');
});

router.get('/index', (req, res) => {
    res.redirect('index.html');
});

router.get('/index.html', async (req, res) => {
    console.log('-------------------------------');
    console.log('Sessão atual:');
    console.log(req.session?.login);
    console.log('-------------------------------');

    const User = require('../models/User');
    const EmbedShows = require('../utils/embed');

    const query = User.findOne({'email': req.session.login});
    query.select('nome email favoritos');
    const user = await query.exec();

    if (req.session.login) {
        var favoritosHTML = await EmbedShows(user.favoritos, true, user.favoritos, "/");
        favoritosHTML = favoritosHTML.join("");

        res.render('logado', {user : user, favoritosHTML : favoritosHTML});
        return;
    }

    res.render('index', {feedback: ""});
});

router.get('/cadastro.html', (req, res) => {
    res.render('cadastro', { feedback : "" });
});

router.get('/calendario.html', async (req, res) => {
    const EmbedEventos = require('../utils/embed');
    res.render('calendario', { eventsHTML : (await EmbedEventos()).join("")});
});

router.get('/contato.html', (req, res) => {
    res.render('contato');
});

router.get('/galeria.html', async (req, res) => {
    const EmbedImages = require('../utils/embed');
    res.render('galeria', { imagesHTML : (await EmbedImages()).join("")});
});

router.get('/carrinho.html', (req, res) => {
    res.render('carrinho');
});

router.get('/logado.html', async (req, res) => {
    res.redirect('/');
});

router.get('/senha.html', (req, res) => {
    res.render('senha', { feedback : "" });
});

module.exports = router;
