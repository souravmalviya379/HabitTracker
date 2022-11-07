const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const habitsController = require('../controllers/habits_controller');

router.get('/', homeController.home);
router.post('/habits/create', habitsController.create);
router.get('/habits/delete/:id', habitsController.destroy);
router.get('/habits/status/:habitstatus/:id', habitsController.updateStatus);

module.exports = router;