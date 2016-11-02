'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
console.log(process.argv);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

//Your next task is to refactor the application to handle the read subcommand via the process arguments, read the pets.json file, parse its data to a native JavaScript object, and log it to the console. If the call to the filesystem fails for any reason, it should throw the resulting error.

if (cmd === 'read') {
  console.log('the user commanded we read!');

  fs.readFile(petsPath, 'utf8', function(err, data) {

    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    console.log(pets);
  });
}

else if (cmd === 'create') {
  console.log('the user commanded we create!');
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
