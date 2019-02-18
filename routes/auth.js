const {Router} = require('express');
const {
    authUser,
    passportLocalAuthUser,
    passportFBAuthUser,
    passportFBAuthUserCB,
    passportTwitterAuthUser,
    passportTwitterAuthUserCB,
    passportGoogleAuthUser,
    passportGoogleAuthUserCB
} = require('../controllers');
const router = Router();

router.post('/', authUser);
router.post('/passport', passportLocalAuthUser);
router.get('/facebook', passportFBAuthUser());
router.get('/facebook/callback', passportFBAuthUser({failureRedirect: '/login'}), passportFBAuthUserCB);
router.get('/twitter', passportTwitterAuthUser());
router.get('/twitter/callback', passportTwitterAuthUser({failureRedirect: '/login'}), passportTwitterAuthUserCB);
router.get('/google', passportGoogleAuthUser({scope: ['profile']}));
router.get('/google/callback', passportGoogleAuthUser({failureRedirect: '/login'}), passportGoogleAuthUserCB);
module.exports = router;
