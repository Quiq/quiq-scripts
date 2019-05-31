/* eslint-disable */

var fs = require('fs');

var rootPath = '/centricient/keystore/';
var corpCert = 'centricient.corp.inter.root.bundle.crt.pem';
var corpKey = 'centricient.corp.key.pem';

var ssl = {};
try {
  console.log('Attempting to load *.corp certificate at ' + rootPath + corpCert);
  ssl = {
    cert: fs.readFileSync(rootPath + corpCert),
    key: fs.readFileSync(rootPath + corpKey)
  };
} catch (err) {
  console.log('Corp certificate not available. Attempting to load *.dev certificate at ' + rootPath + corpCert);
  ssl = {
    cert: fs.readFileSync(__dirname + '/centricient.dev.inter.root.bundle.crt.pem'),
    key: fs.readFileSync(__dirname + '/centricient.dev.key.pem')
  };
}

module.exports = ssl;
