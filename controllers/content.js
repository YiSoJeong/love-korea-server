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
  const { areacode } = req.params;
  axios.get(`${BASE_URL}/areaBasedList?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREALIST_NUM}&areaCode=${areacode}`)
  .then(
    (response) => {
      const AreaList = response.data.response.body.items.item;
      result.data = AreaList.map((x) => {
        return {
          addr1: x.addr1 || '',
          addr2: x.addr2 || '',
          contentid: x.contentid,
          firstimage: x.firstimage || '',
          firstimage2: x.firstimage2 || '',
          mapx: x.mapx || '',
          mapy: x.mapy || '',
          mlevel: x.mlevel || '',
          readcount: x.readcount || '',
          title: x.title,
          zipcode: x.zipcode || ''
        }
      });
      res.status(200).json(result);
    }
  ).catch((error) => {
    res.status(400).json({ "message": "선택한 지역의 관광지를 불러올 수 없습니다." });
  });
}

const getLocationList = (BASE_URL, API_KEY) => async (req, res, next) => {
  const result = { data:[] };
  const { mapX, mapY, radius } = req.body;
  axios.get(`${BASE_URL}/locationBasedList?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREALIST_NUM}&mapX=${mapX}&mapY=${mapY}&radius=${radius}`)
  .then(
    (response) => {
      const AreaList = response.data.response.body.items.item;
      result.data = AreaList.map((x) => {
        return {
          addr1: x.addr1 || '',
          addr2: x.addr2 || '',
          contentid: x.contentid,
          dist: x.dist,
          firstimage: x.firstimage || '',
          firstimage2: x.firstimage2 || '',
          mapx: x.mapx || '',
          mapy: x.mapy || '',
          mlevel: x.mlevel || '',
          readcount: x.readcount || '',
          title: x.title,
          zipcode: x.zipcode || ''
        }
      });
      console.log(result)
      res.status(200).json(result);
    }
  ).catch((error) => {
    res.status(400).json({ "message": "요청 위치 주변의 관광지를 불러올 수 없습니다." });
  });
}

const getDetailInfo = (BASE_URL, API_KEY) => async (req, res, next) => {
  const result = { data:[] };
  const { id } = req.params;
  axios.get(`${BASE_URL}/detailCommon?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREALIST_NUM}&contentId=${id}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
  .then(
    (response) => {
      const info = response.data.response.body.items.item;
      result.data = {
        contentid: info.contentid,
        homepage: info.homepage || '',
        tel: info.tel || '',
        telname: info.telname || '',
        title: info.title,
        firstimage: info.firstimage || '',
        firstimage2: info.firstimage2 || '',
        areacode: info.areacode || '',
        addr1: info.addr1 || '',
        addr2: info.addr2 || '',
        zipcode: info.zipcode || '',
        mapx: info.mapx || '',
        mapy: info.mapy || '',
        mlevel: info.mlevel || '',
        overview: info.overview || ''
      };
      console.log(result);
      res.status(200).json(result);
    }
  ).catch((error) => {
    res.status(400).json({ "message": "해당 관광지 정보를 불러올 수 없습니다." });
  });
}

module.exports = { getAreaCode, getAreaList, getLocationList, getDetailInfo };
