import { Router } from 'express';
import korail from './router/korail.js';
import dictionary from './router/dictionary.js';

const api = Router();

api.use('/korail', korail); //korail톡
api.use('/dictionary', dictionary); //외래어 사전

export default api;
