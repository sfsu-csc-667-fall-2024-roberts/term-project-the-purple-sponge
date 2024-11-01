import express from 'express'; // need to do it the ES6 way to avoid false errors with typescript
import db from '../db/connection';

const router = express.Router();

router.get('/waitinglobby', (request, response) => {
  response.render('waiting_lobby');
});

router.get('/gamecreation', (request, response) => {
  response.render('game_creation_page');
});

router.get('/gamescreen', (request, response) => {
  response.render('game_screen');
});

export default router;
