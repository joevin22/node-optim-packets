'use strict';

const _  = require('lodash');
const utils = require('./utils');
const express = require('express');

const port = (process.env.PORT || 5000);

const app = express();

app.set('port', port);

app.get('/', function (req, res) {

  let packets = req.query.packets || '163841689525773';
  //let packets = '123578911';
  //let packets = '8978242276814512134980329893248349789378539834123231675212368121286324329446548563256137868956343112338935';
  //let packets = '0002222222222222222222222222000111111110000099900000333333333330000000000055555000000007777777700000';
  //let packets = '43571null23453nil211234undefined842NaN421';
  //console.log('packets ', packets);

  const packetsOrderer = utils.reorder(packets.split(''));
  const packetsOptimized = utils.optimiz(packetsOrderer);
  const data =  utils.formatData(packetsOptimized).join('/');

  res.send(data);

});

// Start server
function startServer() {
  app.listen(port, function() {
    console.log('Express server listening on %d, in %s mode', port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;

