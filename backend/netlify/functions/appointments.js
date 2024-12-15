const express = require('express');
const appointmentRoutes = require('../../routes/appointmentRoutes');

const app = express();
app.use(express.json());

// Mount appointment routes
app.use('/', appointmentRoutes);

// Netlify Function handler
exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    const { url, method, headers, body } = event;
    const req = { url, method, headers, body: JSON.parse(body || '{}') };
    const res = {
      statusCode: 200,
      headers: {},
      setHeader: (key, value) => (res.headers[key] = value),
      end: (data) => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }),
    };

    app(req, res);
  });
};
