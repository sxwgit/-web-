const fs = require('fs');
var data=JSON.parse(fs.readFileSync("/home/songxw/code/js/web开发/test_file/test.json"));
var params = {
    "id":5,
    "name":"白眉鹰王"
}
data.push(params)
var sdata = JSON.stringify(data)
fs.writeFileSync("/home/songxw/code/js/web开发/test_file/test.json",sdata)
console.log(data[0].id)