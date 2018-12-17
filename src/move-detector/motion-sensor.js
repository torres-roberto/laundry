var { EventHubClient, EventPosition } = require('@azure/event-hubs');
 
var connectionString = '';
 
// Connect to the partitions on the IoT Hub's Event Hubs-compatible endpoint.
// This example only reads messages sent after this application started.
var ehClient;

var printMessage = function (message) {
    console.log('Telemetry received: ');
    //console.log(JSON.stringify(message.body));
    console.log('Movement: ' + message.body.data);
    console.log('');
  };

var printError = function (err) {
    console.log(err.message);
  };

EventHubClient.createFromIotHubConnectionString(connectionString).then(function (client) {
  console.log("Successully created the EventHub Client from iothub connection string.");
  ehClient = client;
  return ehClient.getPartitionIds();
}).then(function (ids) {
  console.log("The partition ids are: ", ids);
  return ids.map(function (id) {
    return ehClient.receive(id, printMessage, printError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  });
}).catch(printError);
  