'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

//Additionally, your application must handle the read subcommand when given an out-of-bound index. In this case, it must display a more specific usage to the standard error channel and exit with a non-zero exit code.

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
