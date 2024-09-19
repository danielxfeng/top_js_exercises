const { LinkedList } = require('./linked_list.js');

const Pair = (key, value) => {
    return { key, value };
}

const HashMap = (loadFactor) => {
    const _loadFactor = loadFactor;
    const _initNBuckets = 16;
    let _buckets = [];
    let _size = 0;
    let _nBuckets = _initNBuckets;

    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    };

    const init = () => {
        _buckets = [];
        for (let i = 0; i < _nBuckets; i++) {
            _buckets.push(LinkedList());
        }
    }

    const getLoadFactor = () => {
        return _size / _nBuckets;
    }

    const set = (key, value) => {
        let item = getNode(key);
        if (item !== null) {
            item.value = value;
            return;
        }
        if (_size / _nBuckets >= _loadFactor) {
            expandBuckets();
        }
        let bucketIdx = hash(key) % _nBuckets;
        _buckets[bucketIdx].append(Pair(key, value));
        _size++;
    }

    const expandBuckets = () => {
        let items = nodes();
        _nBuckets *= 2;
        init();
        _size = 0;
        for (let entry of items) {
            set(entry.key, entry.value);
        }
    }

    const getNode = (key) => {
        let bucketIdx = hash(key) % _nBuckets;
        return _buckets[bucketIdx].findBy(key, (entry, key) => { return entry.key === key });
    }

    const get = (key) => {
        let item = getNode(key);
        return item === null ? null : item.value;
    }

    const has = (key) => {
        let item = getNode(key);
        return item !== null;
    }

    const remove = (key) => {
        let item = getNode(key);
        if (item === null) return;
        let bucketIdx = hash(key) % _nBuckets;
        _buckets[bucketIdx].removeNode(item);
        _size--;
    }

    const length = () => {
        return _size;
    }

    const clear = () => {
        _nBuckets = _initNBuckets;
        init();
        _size = 0;
    }

    const keys = () => {
        return nodes().map((item) => {return item.key});
    };

    const values = () => {
        return nodes().map((item) => {return item.value});
    };

    const entries = () => {
        return nodes().map((item) => [item.key, item.value]);
    };

    const nodes = () => {
        let list = [];
        for (let i = 0; i < _nBuckets; i++) {
            let bucket = _buckets[i];
            list = [...list, ...bucket.toList()];
        }
        return list;
    }

    init();

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
        getLoadFactor
    };
};

const test = HashMap(0.75) // or HashMap() if using a factory
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
console.log(test.getLoadFactor());
test.set('moon', 'silver')
console.log(test.getLoadFactor());
console.log(test.entries());
console.log(test.length());