const {Router} = require('express');
const {Users} = require('../models');
const router = Router();

router.get('/', (req, res) => Users.find().then(users => res.json(users)));
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    Users
        .destroy({where: {id}})
        .then((affectedCount) => {
            if (affectedCount) {
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
