const {Router} = require('express');
const {Cities} = require('../models');
const router = Router();

router.route('/')
    .get((req, res) => {
    Cities.find()
        .then(result => {
            return res.json(result);
        })
        .catch(() => {
            return res.json({error: 'bad news :('})
        })
    })
    .post((req, res) => {
        const {name, country, capital, lat, long} = req.body;
        const fieldsCompleted = name && ('capital' in req.body);
        if (fieldsCompleted) {
            return Cities.create({
                name, country, capital, location: {lat, long}
            })
                .then(data => res.json(data))
                .catch(e => res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'try another data'}, description: e}));
        } else {
            return res.json({code: 400, message: 'Incorrect inputed data', data: {message: 'please, fill all fields'}});
        }
    });
router.get('/:id', (req, res) => Cities.findOne({_id: req.params.id}).then(product => res.json(product)));
router.put('/:id', (req, res) => {
    const _id = req.params.id;
    const args = req.body;

    Cities
        .updateOne({_id}, args)
        .then((affectedCount) => {
            if (affectedCount) {
                res.status(201).json("User Successfuly Updated");
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});
router.delete("/:id", (req, res) => {
    Cities
        .remove({_id: req.params.id})
        .then((affectedCount) => {
            if (affectedCount.n) {
                res.status(201).json("User Successfuly Deleted");
            } else {
                res.status(404).json("User Not Found");
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json("Server internal Error, couldn't update the user, please try late");
        });
});

module.exports = router;
