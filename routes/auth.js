const express = require('express');
const {studentLogin, deanLogin} = require('../controllers/auth');

const router = express.Router();


router.post("/student/login", studentLogin);

router.post("/dean/login", deanLogin);

module.exports = router;