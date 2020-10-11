const axios = require('axios');

const AREA_NUM = 17;

const getAreaCode = (BASE_URL, API_KEY) => async (req, res, next) => {
  const result = {
    data: [],
  };

  axios
    .get(
      `${BASE_URL}/areaCode?ServiceKey=${API_KEY}&MobileOS=AND&MobileApp=love-korea&_type=json&numOfRows=${AREA_NUM}`,
    )
    .then((response) => {
      const AreaCodeArr = response.data.response.body.items.item;
      AreaCodeArr.forEach((x) => delete x.rnum);
      result.data = AreaCodeArr;
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getAreaCode };
