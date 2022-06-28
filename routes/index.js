const router = require('express').Router();
const userRoutes = require('./api/users-routes');
const thoughtRoutes = require('./api/thoughts-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
    res.status(404).send(`404: Page not found`);
});

module.exports = router;