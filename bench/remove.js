var Bench = require('benchmark');
var List = require('..');
var suite = new Bench.Suite;

var count = 5;
var operationsPerTest = count;

var list = new List;
var array = [];

function fill (l) {
    for (var i = 0; i < count; i++) {
        l.push(i);
    };
}

fill(list);
fill(array);

suite.add('List', function () {
    list.remove(4);
});

suite.add('Array', function () {
    var index = array.indexOf(4);
    if (index >= 0) array.splice(index, 1);
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
