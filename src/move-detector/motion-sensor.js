const { EventHubConsumerClient } = require("@azure/event-hubs");
const firebase = require('firebase');

var statusListener;

let laundryStoreStatus = 'isDone';

function getLaundryStatus() {
  var config = {
                                                                
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
  statusListener = firebase.database().ref('/status/');
  
  statusListener.on('value', (status) => {
    laundryStoreStatus = status.val();
  });
}

var connectionString = 'Endpoint=sb://laundry-event-hub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=2hZomLZw8lav2yGrXXhiqtJ7KV39lnEZc6FAyrRA0Uc=';

let position = {
  x: '',
  y: '',
  z: ''
};


function updateLaundryStatus(status) {
  console.log(laundryStoreStatus, '=>', status, position);
  if (status === 'isDone' && laundryStoreStatus !== 'isDone') {
    position = {
      x: '',
      y: '',
      z: ''
    };

    laundryStoreStatus = 'isDone';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    statusListener.set(status)
  }

  if (status === 'isWashing' && laundryStoreStatus !== 'isWashing') {
    laundryStoreStatus = 'isWashing';
    statusListener.set(status)
  }
}

function checkStatus(data) {
  const [x, y, z] = [
    data.x, data.y, data.z
    // parseInt(data.split('|')[0].split(':')[1]),
    // parseInt(data.split('|')[1].split(':')[1]),
    // parseInt(data.split('|')[2].split(':')[1])
  ];

  if (position.x === x ||
      position.y === y ||
      position.z === z) {
        updateLaundryStatus('isDone');
  } else {
        position.x = x;
        position.y = y;
        position.z = z;
        updateLaundryStatus('isWashing');
  }
}

// assume connectionString is set to one provided by Azure.

async function main() {
  console.log('starting event receivers');

  const client = new EventHubConsumerClient(
    "$Default",
    connectionString,
    "laundry"
    );
    
    const subscription = client.subscribe({
      processEvents: (events, context) => {
        if (!events || !events[0] || !events[0].body) {
          return;
        }
        checkStatus(events[0].body[0].data.body.data);
    },
    processError: (err, context) => {
      console.log('welp, err: ', err, context);
      
      // When ready to stop receiving
      subscription.close();
      client.close();
      console.log('closing shop, goodbye!');
    }
  });  
}

const express = require('express')                                                     
const app = express()                                                                  
const port = 3001                                                                      

let count = 0;                                                                         

getLaundryStatus();

app.get('/x/:x/y/:y/z/:z', (req, res) =>  {
  console.log('movement: ', req.params);
  checkStatus(req.params);
  //res.send('Hello World!');
app.listen(port, '0.0.0.0', function() {
  console.log('Listening to port:  ' + port);
}); 

//main();

// console.log('yay! events: ', events[0].body[0].data.body.data, ' context: ', context);
// checkStatus(events[0].body[0].data.body.data);


