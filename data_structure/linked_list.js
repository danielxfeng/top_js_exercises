const Node = (value = null, nextNode = null) => {
    let _value = value;
    let _nextNode = nextNode;

    const getValue = () => {
        return _value;
    }

    const getNext = () => {
        return _nextNode;
    }

    const setValue = (value) => {
        _value = value;
    }

    const setNext = (nextNode) => {
        _nextNode = nextNode;
    }

    return { getValue, getNext, setValue, setNext }
}

const LinkedList = () => {
    let _root = null;
    let _tail = null;
    let _size = 0;

    const append = (value) => {
        let newNode = Node(value);
        if (_root === null) {
            _root = newNode;
        } else {
            _tail.setNext(newNode);
        }
        _tail = newNode;
        _size++;
    }

    const prepend = (value) => {
        const newNode = Node(value, _root);
        if (_size === 0) {
            _tail = newNode;
        }
        _root = newNode;
        _size++;
    }

    const size = () => {
        return _size;
    }

    const head = () => {
        return _root;
    }

    const tail = () => {
        return _tail;
    }

    const at = (index) => {
        if (index >= _size) {
            throw new Error("Out of bound!");
        }
        let curr = _root;
        for (let i = 0; i < index; i++) {
            curr = curr.getNext();
        }
        return curr;
    }

    const pop = () => {
        if (_size === 0) {
            return;
        }
        if (_size === 1) {
            _root = null;
            _tail = null;
        } else {
            let curr = _root;
            while (curr.getNext() !== _tail) {
                curr = curr.getNext();
            }
            curr.setNext(null);
            _tail = curr;
        }
        _size--;
    }

    const contains = (value) => {
        let curr = _root;
        while (curr !== null) {
            if (curr.getValue() === value) {
                return true;
            }
            curr = curr.getNext();
        }
        return false;
    }

    const find = (value) => {
        let curr = _root;
        while (curr !== null) {
            if (curr.getValue() === value) {
                return curr;
            }
            curr = curr.getNext();
        }
        return null;
    }

    const toString = () => {
        let str = "";
        let curr = _root;
        while (curr != null) {
            str += `( ${curr.getValue()} ) -> `
            curr = curr.getNext();
        }
        str += "null";
        return str;
    }

    const insertAt = (value, index) => {
        if (index === 0) {
            return prepend(value);
        }
        if (index === _size) {
            return append(value);
        }
        let prev = at(index - 1);
        let newNode = Node(value, prev.getNext());
        prev.setNext(newNode);
        _size++;
    }

    const removeAt = (index) => {
        if (index === 0) {
            _root = _root.getNext();
            _size = _size > 0 ? _size - 1 : 0;
            return;
        }
        if (index === _size - 1) {
            return pop();
        }
        let prev = at(index - 1);
        prev.setNext(prev.getNext().getNext());
        _size--;
    }

    return { append, prepend, size, head, tail, at, pop, contains, find, toString, insertAt, removeAt };
}

const list = LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());