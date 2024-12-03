const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'dogsApp',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

