'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);

    if (process.argv[3] && pets.length <= process.argv[3]) {
      console.error(`Usage: ${node} ${file} INDEX`);
      process.exit(1);
    } else if (process.argv[3]) {
      console.log(pets[process.argv[3]]);
    }  else {
      console.log(pets);
    }
  });
}

else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {

    if (readErr) {
      throw readErr;
    }

    if (!process.argv[3] || !process.argv[4] || !process.argv[5]) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    var pets = JSON.parse(data);
    var pet = {
      age: Number(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5]
    };

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}

else if (cmd === 'update') {
  console.log('the user commanded we update!');

  fs.readFile(petsPath, 'utf8', function(readErr, data) {

    if (readErr) {
      throw readErr;
    }

    if (!process.argv[3] || !process.argv[4] || !process.argv[5] || !process.argv[6]) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];
    var pet = {
      age: Number(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6]
    };

    pets[index] = pet;

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });

}

else if (cmd === 'destroy'){
  fs.readFile(petsPath, 'utf8', function(readErr, data) {

    if (readErr) {
      throw readErr;
    }

    if (!process.argv[3]) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    var pets = JSON.parse(data);
    var index = process.argv[3];

    if (index > pets.length - 1) {
      console.log("nothing exists at that position");
      process.exit(1);
    }

    pets.splice(index, 1);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
