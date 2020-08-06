const router = require('express').Router();

const hubsRouter = require('../hubs/hubs-router');

router.get('/', (req, res) => {
    res.status(200).json({ router: "api"})
})

router.use('/hubs', hubsRouter);

module.exports = router;