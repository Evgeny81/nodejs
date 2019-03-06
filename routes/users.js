const {Router} = require('express');
const router = Router();
const {User} = require('../models');

router.get('/', (req, res) => {
    User
        .find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(`Internal Server Error: ${err}`)
        });
});

module.exports = router;
