const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/favorite', async (req, res) => {
    if (req.body.favoritado == "nao") {
        await User.updateOne({ email: req.session.login }, { $push: { favoritos: req.body.showId } });
    } else {
        await User.updateOne({ email: req.session.login }, { $pull: { favoritos: req.body.showId } });
    }

    res.redirect(req.body.arquivo);
});

router.post('/deleteaccount', async (req, res) => {
    await User.findOneAndDelete({ email: req.session.login });
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
