const {Router} = require('express');
const router = Router();

router.route('/')
    .get((req, res) => {
        res.send('Return ​ALL​ products');
    })
    .post((req, res) => {
        res.send('Add ​NEW​ product and return it');
    });

router.get('/:id', (req, res) => {
    res.send(`Return ​SINGLE​ product with ID: ${req.params.id}`)
});

router.get('/:id/reviews', (req, res) => {
    res.send(`Return ​ALL​ reviews for a single product with ID: ${req.params.id}`)
});

module.exports = router;
