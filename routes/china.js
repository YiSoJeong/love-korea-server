const express = require('express');
const router = express.Router();
const {
  getAreaCode,
  getAreaList,
  getLocationList,
  getDetailInfo,
} = require('../controllers/content');
require('dotenv').config();

const BASE_URL = 'http://api.visitkorea.or.kr/openapi/service/rest/ChsService';
const API_KEY = process.env.KO_TOUR_API;

router.get('/area-code', getAreaCode(BASE_URL, API_KEY));
router.get('/area-based-list/:areacode', getAreaList(BASE_URL, API_KEY));
router.get('/location-based-list', getLocationList(BASE_URL, API_KEY));
router.get('/detail/:id', getDetailInfo(BASE_URL, API_KEY));

module.exports = router;
