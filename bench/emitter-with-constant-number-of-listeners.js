var Bench = require('benchmark');
var List = require('..');
var suite = new Bench.Suite;

var count = 0;
var cycles = 100;

var list = new List;
var array = [];

function fill (l) {
    for (var i = 0; i < count; i++) {
        l.push(i);
    };
}

function random () {
    return Math.floor(Math.random() * 10);
}

fill(list);
fill(array);

suite.add('List', function () {
    for (var i = 0; i < cycles; i++) {
        list.push(random());
        list.remove(random());
    }
});

suite.add('Array', function () {
    for (var i = 0; i < cycles; i++) {
        array.push(random());
        var index = array.indexOf(random());
        if (index >= 0) array.splice(index, 1);
    }
});

suite.on('cycle', function(event, bench) {
    console.log(String(bench));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
.run({ 'async': true });
