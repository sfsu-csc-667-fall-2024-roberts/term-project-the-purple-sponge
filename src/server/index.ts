import express from 'express';
import httpErrors from 'http-errors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import { timeMiddleware } from './middleware/time';

dotenv.config();

// routes
import rootRoutes from './routes/root';
import gameRoutes from './routes/game';

import liveReloadConfig from './config/livereload';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.set('views', path.join(process.cwd(), 'src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(timeMiddleware);
const staticPath = path.join(process.cwd(), 'src', 'public');
app.use(express.static(staticPath)); // referencing static files starts from public folder
liveReloadConfig(app, staticPath);

// Routes
// unauthenticated landing page
// authenticated landing page (where a game list and global chat will go)
// login
// register
// game lobby
// game page

app.use(cookieParser());
app.use('/', rootRoutes);
app.use('/game', gameRoutes);

// express goes in sequential order of middleware that is used
// this will be the last thing it tries to match if it is at the bottom
// and will intercept the normal 404 error and give us the one we sent
app.use((request, response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
