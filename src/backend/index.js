import express from 'express';
import cors from 'cors';

import routes from './routes';
import requestLogger from './middleware';

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(requestLogger);

routes(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable-next-line */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
}

/* eslint-disable-next-line */
console.log('app running on port ', port);

export default app;
