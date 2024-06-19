const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
const User = require('../models/User');
const EmbedShows = require('../utils/embed');

router.post('/details', async (req, res) => {
    const show = await Show.findById(req.body.showId).select().exec();
    res.render('event_details', { show });
});

router.get('/shows.html', async (req, res) => {
    const showsList = (await Show.find().select('_id').exec()).map(show => show.id);

    let favsIds = [];
    let logado = false;

    if (req.session.login) {
        favsIds = (await User.findOne({ email: req.session.login }).select('favoritos').exec()).favoritos;
        logado = true;
    }

    let showsHTML = await EmbedShows(showsList, logado, favsIds, "/shows.html");
    showsHTML = showsHTML.join("");
    res.render('shows', { showsHTML });
});

module.exports = router;
