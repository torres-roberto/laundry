const firebase = require('firebase');
const express = require('express')                                                     
const dotenv = require('dotenv');

dotenv.config();

var statusListener;

const port = process.env.PORT;                                                                      

let laundryStoreStatus = 'isDone';

function getLaundryStatus() {
  var config = {
    apiKey: `${process.env.FIREBASE_APIKEY}`,
    databaseURL: `${process.env.FIREBASE_DBURL}`,
    storageBucket: `${process.env.FIREBASE_STORAGEBUCKET}`
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  statusListener = firebase.database().ref('/status/');
  
  statusListener.on('value', (status) => {
    laundryStoreStatus = status.val();
  });
}


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
  const [x, y, z] = [data.x, data.y, data.z];

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

const app = express()                                                                  

let count = 0;                                                                         

getLaundryStatus();

app.get('/x/:x/y/:y/z/:z', (req, res) =>  {
  console.log(++count, 'movement: ', req.params);
  checkStatus(req.params);
});
  
app.listen(port, '0.0.0.0', function() {
  console.log('Listening to port:  ' + port);
}); 
