var unique = require('uniq');
var $ = require('jquery');
var _ = require('lodash');

var foo = require('./foo.js');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
console.log('foo(5)', foo(5));

var importModule = require('./import.js');

console.log(importModule.square(5));

var cred = {
    name: 'Ritesh Kumar',
    enrollmentNo: 11115078
}

var x = new importModule.MyClass(cred);

//Ritesh Kumar
console.log(x.getName());