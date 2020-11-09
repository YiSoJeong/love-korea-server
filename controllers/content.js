const axios = require('axios');

const AREA_NUM = 17;
const AREALIST_NUM = 24931

const getAreaCode = (BASE_URL, API_KEY) => async (req, res, next) => {
  const result = { data: [] };

  axios
    .get(
      `${BASE_URL}/areaCode?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREA_NUM}`,
    )
    .then((response) => {
      const AreaCodeArr = response.data.response.body.items.item;
      AreaCodeArr.forEach((x) => delete x.rnum);
      result.data = AreaCodeArr;
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ "message": "지역을 불러올 수 없습니다." });
    });
};

const getAreaList = (BASE_URL, API_KEY) => async (req, res, next) => {
  const result = { data:[] };
  const areaCode = req.params.id;
  axios.get(`${BASE_URL}/areaBasedList?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREALIST_NUM}&areaCode=${areaCode}`)
  .then(
    (response) => {
      const AreaList = response.data.response.body.items.item;
      result.data = AreaList.map((x) => {
        return {
          addr1: x.addr1 || '',
          addr2: x.addr2 || '',
          contentid: x.contentid || '',
          firstimage: x.firstimage || '',
          firstimage2: x.firstimage2 || '',
          mapx: x.mapx || '',
          mapy: x.mapy || '',
          mlevel: x.mlevel || '',
          readcount: x.readcount || '',
          title: x.title || '',
          zipcode: x.zipcode || ''
        }
      });
      res.status(200).json(result);
    }
  ).catch((error) => {
    res.status(400).json({ "message": "선택한 지역의 관광지를 불러올 수 없습니다." });
  });
}

module.exports = { getAreaCode, getAreaList };
