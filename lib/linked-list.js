module.exports = LinkedList;

// Code here is a bit preformance optimized

function LinkedList () {
    this.length = 0;
}

function Item (obj, prev, next) {
    this.obj = obj;
    this.prev = prev;
    this.next = next;
}

LinkedList.prototype = {
    first: function () {
        return this._first ? this._first.obj : undefined;
    },
    
    last: function () {
        return this._last ? this._last.obj : undefined;
    },

    push: function (obj) {
        if (this.length === 0) {
            this._first = this._last = new Item(obj);
        }
        else {
            var item = new Item(obj, this._last);
            this._last.next = item;
            this._last = item;
        }
        this.length++;
    },

    pop: function () {
        if (this.length === 0) return;
        var obj = this._last.obj;
        if (this.length === 1) {
            this._first = this._last = null;
        }
        else {
            this._last = this._last.prev;
            this._last.next = null;
        }
        this.length--;
        return obj;
    },

    unshift: function (obj) {
        if (this.length === 0) {
            this._first = this._last = new Item(obj);
        }
        else {
            var item = new Item(obj, null, this._first);
            this._first.prev = item;
            this._first = item;
        }
        this.length++;
    },

    shift: function () {
        if (this.length === 0) return;
        var obj = this._first.obj;
        if (this.length === 1) {
            this._first = this._last = null;
        }
        else {
            this._first = this._first.next;
            this._first.prev = null;
        }
        this.length--;
        return obj;
    },

    forEach: function (cb) {
        var item = this._first;
        while (item) {
            cb(item.obj);
            item = item.next
        }
    },

    remove: function (obj) {
        var item = this._first;
        while (item) {
            if (item.obj === obj)
                return this._removeItem(item);
            item = item.next;
        }
    },

    _removeItem: function (i) {
        if (i === this._first) return this.shift();
        if (i === this._last) return this.pop();
        var prev = i.prev;
        var next = i.next;
        prev.next = next;
        next.prev = prev;
        this.length--;
        return i.obj;
    }
}
