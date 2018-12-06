//main.js  main.js用来把Greeter模块返回的节点插入页面。
var greeter = require('./Greeter.js');
document.getElementById('root').appendChild(greeter());


// Greeter.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};