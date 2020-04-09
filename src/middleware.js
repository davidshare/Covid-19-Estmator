import path from 'path';
import { getTimeInMilliseconds, saveToFile } from './helpers';

const requestLogger = (request, response, next) => {
  const { method, url } = request;
  const { statusCode } = response;
  const startTime = process.hrtime();
  const timeInMS = getTimeInMilliseconds(startTime).toLocaleString();
  const message = `${method}\t\t${url}\t\t${statusCode}\t\t${timeInMS} ms`;
  const filePath = path.join(__dirname, 'request_logs.txt');

  saveToFile(message, filePath);
  next();
};

export default requestLogger;
