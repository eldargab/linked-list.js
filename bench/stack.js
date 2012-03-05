var Bench = require('benchmark');
var List = require('..');
var FastList = require('fast-list');
var suite = new Bench.Suite;

var l  = 10;
var operationsPerTest = l * 2;

var list = new List;
var fl = new FastList;
var array = [];
var array2 = [];

suite.add('List', function () {
    for (var i = 0; i < l; i++) {
        list.push(i);
    }
    for (var i = 0; i < l; i++) {
        list.pop();
    }
});

suite.add('Array', function () {
    for (var i = 0; i < l; i++) {
        array.push(i);
    }
    for (var i = 0; i < l; i++) {
        array.pop();
    }
});

suite.add('Array with shifting unshifting', function () {
    for (var i = 0; i < l; i++) {
        array2.unshift(i);
    }
    for (var i = 0; i < l; i++) {
        array2.shift();
    }
});

suite.add('Isaacs fast-list', function () {
    for (var i = 0; i < l; i++) {
        fl.push(i);
    }
    for (var i = 0; i < l; i++) {
        fl.pop();
    }
});


suite.on('cycle', function(event, bench) {
    console.log(String(bench) + '. One operation takes: ' + printSpeed(bench, operationsPerTest));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });

function printSpeed (bench, opCount) {
    opCount = opCount != null ? opCount : 1;
    var speed = 1000 * 1000 * 1000/ (bench.hz * opCount);
    return Bench.formatNumber(speed.toFixed()) + ' ns';
}
