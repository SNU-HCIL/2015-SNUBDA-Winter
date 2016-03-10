var fs = require('fs');

fs.readFile('iris.tsv', function(err, data){
  var lines = data.toString().split('\n');
  var headers = lines[0].split('\t');
  var result = [];
  lines.forEach(function(line, i){
    if(i == 0) return;
    if(line.length == 0) return;
    var values = line.split('\t');
    var d = {};
    result.push(d);
    headers.forEach(function(header, i){
      d[header] = values[i];
    })
  })
  fs.writeFile('iris.json', JSON.stringify(result, null, 2));
})
