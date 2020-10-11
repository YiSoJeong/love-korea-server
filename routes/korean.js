const express = require('express');
const router = express.Router();
const { getAreaCode } = require('../controllers/content');
require('dotenv').config();

const BASE_URL = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService';
const API_KEY = process.env.KO_TOUR_API;

router.get('/area-code', getAreaCode(BASE_URL, API_KEY));

module.exports = router;
