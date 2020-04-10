import path from 'path';
import { getTimeInMilliseconds, saveToFile } from './helpers/helpers';

const requestLogger = (request, response, next) => {
  const { method, url } = request;
  const { statusCode } = response;
  const startTime = process.hrtime();
  const timeInMS = getTimeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${Math.floor(
    timeInMS
  )
    .toString()
    .padStart(2, '00')}ms`;
  const filePath = path.join(__dirname, 'request_logs.txt');

  saveToFile(message, filePath);
  next();
};

export default requestLogger;
