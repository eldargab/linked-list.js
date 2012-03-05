var Bench = require('benchmark');
var List = require('..');
var FastList = require('fast-list');
var suite = new Bench.Suite;

var l  = 50;
var operationsPerTest = l;

suite.add('List', function () {
    var list = new List;
    for (var i = 0; i < l; i++) {
        list.unshift(i);
    }
});

suite.add('Array', function () {
    var array = [];
    for (var i = 0; i < l; i++) {
        array.unshift(i);
    }
});

suite.add('Isaacs fast-list', function () {
    var fl = new FastList;
    for (var i = 0; i < l; i++) {
        fl.unshift(i);
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
