import logger from 'morgan';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import gitRootPath from 'git-root-path';

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(gitRootPath(__dirname), 'client', 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

app.use((err, req, res, next) => {
    res.status(400).json({error: err.stack});
});

export default app;
