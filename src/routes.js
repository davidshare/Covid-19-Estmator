import Xml2js from 'xml2js';
import fs from 'fs';
import path from 'path';

import { formatAPIResponse, jsonResponse } from './estimator';

/**
 * @param {object} app
 * @returns {object} undefine
 * @description function for handling routing
 */
const routes = (app) => {
  app.get('/', (request, response) => response.status(200).json({
    success: true,
    message: 'Welcome to the Covid-19 Estimator API'
  }));

  app.post('/api/v1/on-covid-19', jsonResponse);

  app.post('/api/v1/on-covid-19/json', jsonResponse);

  app.post('/api/v1/on-covid-19/xml', (request, response) => {
    const data = request.body;
    const estimation = formatAPIResponse(data);
    const builder = new Xml2js.Builder();
    response.header('Content-Type', 'application/xml; charset=UTF-8');
    response.status(200).send(builder.buildObject(estimation));
  });

  app.get('/api/v1/on-covid-19/logs', (request, response) => {
    try {
      const filePath = path.join(__dirname, 'request_logs.txt');
      const data = fs.readFileSync(filePath, 'utf8');
      response.status(200).send(data);
    } catch (error) {
      throw new Error('Sorry, there was an issue reading the logs try');
    }
  });

  app.delete('/api/v1/on-covid-19/logs', (request, response) => {
    try {
      const filePath = path.join(__dirname, 'request_logs.txt');
      fs.unlinkSync(filePath);
      response.status(201).send({
        message: 'logs deleted'
      });
    } catch (error) {
      throw new Error('Sorry, there was an issue deleting the logs try');
    }
  });
};

export default routes;
