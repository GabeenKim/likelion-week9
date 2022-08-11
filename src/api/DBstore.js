import { Router } from 'express';
import request from 'request';
import dictionaryData from '../../models/dictionaryData';

const router = Router();

let options = {
  method: 'GET',
  url: 'https://plainkorean.kr/api.jsp?keyword',
  headers: {
    Cookie: 'JSESSIONID=AEA04EFE0E6DC9D523C1A18216571BF3',
  },
};

router.post('/', async (req, res) => {
  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
    let info = JSON.parse(body);
    let i = 0;

    for (i in info) {
      let searchWord = info[i].keyword;
      let meaning = info[i].alt;
      let loan_ex = info[i].example[0];
      let korean_ex = info[i].example[1];

      dictionaryData.create({
        loanword: searchWord,
        meaning: meaning,
        ex_loan: loan_ex,
        ex_korean: korean_ex,
      });
    }
  });
});

export default router;
