import dotenv from 'dotenv';
import connectLiveReload from 'connect-livereload';
import livereload from 'livereload';
import type { Express } from 'express';
dotenv.config();

export default (app: Express, staticPath: string) => {
  if (process.env.NODE_ENV === 'development') {
    const reloadServer = livereload.createServer();
    reloadServer.watch(staticPath);
    reloadServer.server.once('connection', () => {
      setTimeout(() => {
        reloadServer.refresh('/');
      }, 100);
    });
    app.use(connectLiveReload());
  }
};
