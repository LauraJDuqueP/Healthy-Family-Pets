const express = require('express');
const router = express.Router();

function routerApi(app) {
  app.use('/healthyFamilyPets/v1');
}
