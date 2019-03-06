const {Router} = require('express');
const router = Router();
const {Products, Reviews} = require('../models');

router.route('/')
    .get((req, res) => {
        Products
            .findAll({})
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(500).json(`Internal Server Error: ${err}`)
            });
    })
    .post((req, res) => {
        console.log(req.body);
        const {name, brand, price} = req.body;
        const fieldsCompleted = name && brand && price;
        if (fieldsCompleted) {
            return Products.create({
                name,
                brand,
                price
            })
                .then(data => res.json(data))
                .catch(e => res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'try another data'}}));
        } else {
            return res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'please, fill all fields'}});
        }

    });

router.get('/:id', (req, res) => {
    Products
        .find({where: {id: req.params.id}})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(`Internal Server Error: ${err}`)
        });
});

router.get('/:id/reviews', (req, res) => {
    Reviews
        .findAll({where: {productId: req.params.id}})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(`Internal Server Error: ${err}`)
        });
});

module.exports = router;
