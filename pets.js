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

    console.log(pets);
  });
}

else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var pet = process.argv[3];

    if (!pet) {
      console.error(`Usage: ${node} ${file} ${cmd} pet`);
      process.exit(1);
    }

    pets.push(pet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(pet);
    });
  });
}

else if (cmd === 'update') {
  console.log('the user commanded we update!');
}

else if (cmd === 'delete'){
  console.log('the user commanded we delete!');
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | delete]`);
  process.exit(1);
}
