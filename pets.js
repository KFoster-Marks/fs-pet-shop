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


//Finally, your application must also handle the create subcommand. Only when given an age, kind, and name will it create a record in the database. Remember to convert the age into an integer. For example:

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
}

else if (cmd === 'delete'){
  console.log('the user commanded we delete!');
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
