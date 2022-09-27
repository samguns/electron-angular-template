import createError from "http-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import history from "connect-history-api-fallback";
import path from "path";
import fileUpload from "express-fileupload";
import systemRouter from './system/system.route.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
process.env.NODE_ENV !== "production" && app.use(morgan("development"));
app.use(cookieParser());
app.use(history());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/sys', systemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({error: err.message});
});

export default app
