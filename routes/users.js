const {Router} = require('express');
const {checkIsUserAuthorized} = require('../middlewares');
const router = Router();

router.use(checkIsUserAuthorized);
router.get('/', (req, res) => {
    res.send('Return ​ALL​ users');
});

module.exports = router;
