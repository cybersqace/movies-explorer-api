const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { signInValidation, signUpValidation } = require('../middlewares/validations');
const NotFound = require('../errors/NotFound');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);
router.use('/', require('./users'));
router.use('/', require('./movies'));

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

module.exports = router;
