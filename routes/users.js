const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Return ​ALL​ users');
});

module.exports = router;
