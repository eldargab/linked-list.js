var should = require('should');
var List = require('../lib/linked-list');

describe('Linked list', function () {
    var list;

    beforeEach(function () {
        list = new List;
    });
    
    function expect (array) {
        var l = [];
        list.forEach(function (i) {
            l.push(i);
        });
        l.should.eql(array);
    }

    it('test pushing poping', function () {
        list.push(1);
        list.push(2);
        expect([1, 2]);

        list.pop().should.equal(2);
        expect([1]);

        list.pop().should.equal(1);
        expect([]);

        (list.pop() === undefined).should.be.true;
        expect([]);
    });


    it('test shifting unshifting', function () {
        list.unshift(2);
        list.unshift(1);
        expect([1, 2]);

        list.shift().should.equal(1);
        expect([2]);

        list.shift().should.equal(2);
        expect([]);
        
        (list.shift() === undefined).should.be.true;
    });

    it('test removing', function () {
        list.push(1);
        list.push(2);
        list.push(3);
        list.push(4);

        list.remove(2);
        expect([1, 3, 4]);

        list.remove(4);
        expect([1, 3]);

        list.remove(10);
        expect([1, 3]);

        list.remove(1);
        expect([3]);

        list.unshift(1);
        list.push(4);
        expect([1, 3, 4]);
    });
});

