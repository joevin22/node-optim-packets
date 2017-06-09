'use strict';

const express = require('express');
const _  = require('lodash');
const utils = require('./utils');

const app = express();

app.get('/', function (req, res) {

  //let packets = '8978242276814512134980329893248349789378539834123231675212368121286324329446548563256137868956343112338935';
  //let packets = '123578911';
  let packets = '163841689525773';
  //console.log('packets ', packets);

  const standardOptimized = utils.standardOptimiz(packets.split(''));
  const packetsOrderer = utils.reorder(packets.split(''));
  const packetsOptimized = utils.optimiz(packetsOrderer);
  
  const optimizedWeight = _.reduce(packetsOptimized, function(s, entry) {
      return s + parseInt(entry.total);
  }, 0);
  const packetsWeight = _.reduce(packets, function(s, entry) {
      return s + parseInt(entry);
  }, 0);

  res.send({
    optimized: packetsOptimized, 
    optimizedWeight: optimizedWeight, 
    standardOptimized: standardOptimized,
    packets: packets, 
    weigth: packetsWeight, 
    numberOfPackets: {
      origin: standardOptimized.length,
      optimized: packetsOptimized.length
    }
  });

});

// Start server
function startServer() {
  app.listen(3000, function() {
    console.log('Express server listening on 3000, in %s mode', app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;

