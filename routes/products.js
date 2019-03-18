const {Router} = require('express');
const {Products, Reviews} = require('../models');
const router = Router();

router.route('/')
    .get((req, res) => Products.find().then(products => res.json(products)))
    .post((req, res) => {
        const {title, description, price, id, rate} = req.body;
        const fieldsCompleted = title && id;
        if (fieldsCompleted) {
            return Products.create({
                id,
                title,
                description,
                price,
                rate
            })
                .then(data => res.json(data))
                .catch(e => res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'try another data'}, description: e}));
        } else {
            return res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'please, fill all fields'}});
        }
    }
);

router.get('/:id', (req, res) => Products.findOne({id: req.params.id}).then(product => res.json(product)));

router.get('/:id/reviews', (req, res) => Reviews.find({productId: req.params.id})
    .then(reviews => res.json(reviews))
);

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    Products
        .remove({id})
        .then((affectedCount) => {
            if (affectedCount.n) {
                res.status(201).json("User Successfuly Deleted");
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});
module.exports = router;
