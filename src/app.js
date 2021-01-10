import logger from 'morgan';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';

const app = express();
app.use(logger('dev'));
var static_pages = path.join(__dirname, '..', 'client', 'build');
console.log(static_pages);
app.use(express.static(static_pages));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);

app.use((err, req, res, next) => {
    res.status(400).json({error: err.stack});
});

export default app;
