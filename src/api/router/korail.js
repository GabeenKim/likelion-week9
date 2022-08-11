import { Router } from 'express';
import * as korailController from '../controller/korail.js';

const router = Router();

//GET /stations
router.get('/stations', korailController.getStations);

//GET /staions/:id
router.get('/stations/:id', korailController.getStationById);

//GET /date
router.get('/date', korailController.getDate);

//GET /trains?depPlaceId=${depPlaceId}&arrPlaceId=${arrPlaceId}&depPlandTime=${depPlandTime}
router.get('/trains', korailController.getTrains);

//GET /trains/:id
router.get('/trains/:id', korailController.getTrainById);

//GET /trains/:trainNo/:compId
router.get('/trains/:trainNo/:compId', korailController.getCompById);

//POST /book
router.post('/book', korailController.createTicket);

export default router;
