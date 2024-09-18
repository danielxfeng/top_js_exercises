function fibs(num) {
    if (num === 0) return [0];
    if (num === 1) return [0, 1];
    res = [0, 1];
    for (let i = 2; i < num; i++) {
        res.push(res[i - 2] + res[i - 1]);
    }
    return res;
}

function fibsRecHelper(num, res = new Map([[0, 0], [1, 1]])) {
    if (res.has(num)) {
        return res.get(num);
    }
    let pp = fibsRecHelper(num - 2, res);
    let p = fibsRecHelper(num - 1, res);
    res.set(num, pp + p);
    return res.get(num);
}

function fibsRec(num) {
    fibsRecHelper(num);
    return Array.from([...res.entries()].sort((a, b) => a[0] - b[0]).map(entry => entry[1]));
}

function mergeSort(list) {
    let max = list.length - 1;
    return mergeSortHelper(list, 0, max);
}

function mergeSortHelper(list, min, max) {
    if (max === min) return [list[min]];
    if (min > max) return [];
    let half = Math.floor((max + min) / 2);
    return merge(mergeSortHelper(list, min, half), mergeSortHelper(list, half + 1, max));
}

function merge(left, right) {
    let newList = [];
    let l = 0;
    let r = 0;
    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) {
            newList.push(left[l]);
            l++;
        } else {
            newList.push(right[r]);
            r++;
        }
    }
    return [...newList, ...left.slice(l), ...right.slice(r)];
}

console.log(fibs(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibsRec(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(mergeSort([105, 79, 100, 110])); // [79, 100, 105, 110]