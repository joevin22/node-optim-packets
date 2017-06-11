'use strict';

const _  = require('lodash');
const utils = require('./utils');
const express = require('express');

const port = (process.env.PORT || 5000);

const app = express();

app.set('port', port);

app.get('/', function (req, res) {

  let packets = req.query.packets || '163841689525773';

  const packetsOrdered = utils.reorder(packets.split(''));
  const packetsOptimized = utils.optimiz(packetsOrdered);
  const data =  utils.formatData(packetsOptimized).join('/');

  res.send(data);

});

app.get('/api', function (req, res) {

  let packets = req.query.packets || '163841689525773';
  //let packets = '7872093789237823736721827387239874398437862735264152431523142312412432143254236526354236743543764378436345524352314312452135423523768718798732542511245E154227672165236752362354373467834823651214';
  //let packets = '123578911';
  //let packets = '8978242276814512134980329893248349789378539834123231675212368121286324329446548563256137868956343112338935';
  //let packets = '0002222222222222222222222222000111111110000099900000333333333330000000000055555000000007777777700000';
  //let packets = '43571null23453nil211234undefined842NaN421';
  //console.log('packets ', packets);

  const packetsOrigin = utils.optimizOrigin(packets.split(''));
  const packetsOrdered = utils.reorder(packets.split(''));
  const packetsOptimized = utils.optimiz(packetsOrdered);
  const dataOrigin =  utils.formatData(packetsOrigin).join('/');
  const dataOptimized =  utils.formatData(packetsOptimized).join('/');

  const optimizedTotal = _.reduce(packetsOptimized, function(s, entry) {
      return s + parseInt(entry.total);
  }, 0);
  const originTotal = _.reduce(packetsOrigin, function(s, entry) {
      return s + parseInt(entry.total);
  }, 0);
  const packetsTotal = _.reduce(packets, function(s, entry) {
      //return s + (parseInt(entry) || 0);
      return s + parseInt(entry);
  }, 0);

  res.send({
    verify: ((packetsTotal === optimizedTotal) && (packetsTotal === originTotal)),
    total: {
      in: packetsTotal,
      origin: originTotal,
      optimize: optimizedTotal
    },
    packets: {
      origin: packetsOrigin.length,
      optimize: packetsOptimized.length
    },
    in: packets,
    origin: dataOrigin,
    data: dataOptimized
  });

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

