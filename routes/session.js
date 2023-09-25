const express = require('express');
const {verifyToken} = require('../middleware/token');
const {getAvailableSessions, bookSession,getPendingSessions} = require('../controllers/session');

const router = express.Router();

router.get("/available", getAvailableSessions)

router.post(
  "/book",verifyToken, bookSession
);

router.get(
  "/pending", verifyToken,  getPendingSessions
);

module.exports = router;