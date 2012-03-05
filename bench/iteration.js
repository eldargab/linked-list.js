var Bench = require('benchmark');
var List = require('..');
var FastList = require('fast-list');
var suite = new Bench.Suite;

var count = 10;
var operationsPerTest = count;

var list = new List;
var fl = new FastList;
var array = [];

function fill (l) {
    for (var i = 0; i < count; i++) {
        l.push(i);
    };
}

fill(list);
fill(array);
fill(fl);

suite.add('List', function () {
    list.forEach(function () {});
});

suite.add('Array', function () {
    array.forEach(function () {});
});

suite.add('Isaacs fast-list', function () {
    fl.forEach(function () {});
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
