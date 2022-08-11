import express from 'express';
import api from './api/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT;

const { sequelize } = require('../models');
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: 'http://localhost:3000', //허락하고자 하는 요청주소여야 함!
  credentials: true,
};

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', api);

app.listen(port, () => {
  console.log(`서버실행 => http://localhost:${port}`);
});
