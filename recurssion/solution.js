function sumRange(num) {
    if (num === 1) return 1;
    return num + sumRange(num - 1);
}

function power(m, n) {
    if (n === 0) return 1;
    if (n === 1) return m;
    return m * power(m, n - 1);
}

function factorial(num) {
    if (num === 1) return 1;
    return num * factorial(num - 1);
}

var allAreLessThanSeven = all([1,2,9], function(num){
	return num < 7;
});

function allHelper(list, func, idx) {
    if (list.length <= idx) return true;
    if (!func(list[idx])) return false;
    return allHelper(list, func, idx + 1);
}

function all(list, func) {
    return allHelper(list, func, 0);
}

function productOfArrayHelper(list, idx, res) {
    if (list.length === idx) return res;
    res *= list[idx];
    return productOfArrayHelper(list, idx + 1, res);
}

function productOfArray(list) {
    if (list.length === 0) return 0;
    if (list.length === 1) return list[0];
    return productOfArrayHelper(list, 0, 1);
}

function contains(node, value) {
    for (let key in node) {
        if (node[key] === value) return true;
        if ((typeof node[key] === 'object' && node[key] !== null)
            && (contains(node[key], value))) return true;
    }
    return false;
}

console.log(sumRange(3)); // 6

console.log(power(2, 4)); // 16
console.log(power(2, 3)); // 8
console.log(power(2, 2)); // 4
console.log(power(2, 1)); // 2
console.log(power(2, 0)); // 1

console.log(factorial(5)); // 120

console.log(allAreLessThanSeven); // false

console.log(productOfArray([1,2,3])) // 6
console.log(productOfArray([1,2,3,10])) // 60

var nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: 'foo2'
                    }
                }
            }
        }
    }
}

console.log(contains(nestedObject, 44)); // true
console.log(contains(nestedObject, "foo")); // false