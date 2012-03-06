# Synopsis

This project implements linked list structure and tests it's preformance. Some
folks considered it to be faster than native Array for queueing, stacking and
other use cases with constant pushing and removing of elements. Isaac Z.
Schlueter [reported](https://github.com/isaacs/fast-list) that linked list is
about 2 times faster than Array. [Backbone's](http://backbonejs.org/) Events
object also uses linked list for storing listeners. 

# Results

It turned out that linked list's performance was overrated. While it's possible
to speed up a queueing a bit the gain is negligible and "unstable".

The table below shows benchmarks summary. Performance expressed in time (ns)
taken by one operation.

```
Oper/Struct Array LinkedList Isaac's FastList
----------- ----- ---------- ----------------
Stacking    6     17         27              
Queueing    21    17         28              
forEach     18    16         23              
```
Tests on http://jsperf.com/ are also available:

* http://jsperf.com/linked-list-vs-array-for-queueing
* http://jsperf.com/linked-list-vs-array-for-stacking

# Installation

```
$ git clone git://github.com/eldargab/linked-list.js.git linked-list
$ cd linked-list
$ npm install -d
$ node bench/bench_file_name
```
