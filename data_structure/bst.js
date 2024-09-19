const Node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = () => {
  let _root = null;

  const buildTreeHelper = (list, min, max) => {
    if (min > max) return;
    let mid = Math.floor((max + min) / 2);
    insert(list[mid]);
    buildTreeHelper(list, min, mid - 1);
    buildTreeHelper(list, mid + 1, max);
  };

  const buildTree = (array) => {
    let list = Array.from(new Set(array)).sort((a, b) => a - b);
    buildTreeHelper(list, 0, list.length - 1);
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (value) => {
    let node = Node(value);
    if (_root === null) {
      _root = node;
      return;
    }
    let curr = _root;
    while (true) {
      if (curr.data === value) {
        return;
      }
      if (curr.data < value) {
        if (curr.right === null) {
          curr.right = node;
          return;
        }
        curr = curr.right;
      } else {
        if (curr.left === null) {
          curr.left = node;
          return;
        }
        curr = curr.left;
      }
    }
  };

  const deleteItem = (value) => {
  };

  const find = (value) => {
    let curr = _root;
    while (curr !== null) {
      if (curr.data === value) {
        return true;
      }
      if (curr.data < value) {
        curr = curr.right;
      } else {
        curr = curr.left;
      }
    }
    return false;
  };

  const levelOrder = (callback) => {
    if (typeof callback !== "function") throw new Error("callback should be a function.")
    if (_root === null) return;
    let nodes = [];
    nodes.push(_root);
    while (nodes.length) {
      let node = nodes.shift();
      callback(node);
      if (node.left !== null) nodes.push(node.left);
      if (node.right !== null) nodes.push(node.right);
    }
  };

  const inOrderHelper = (callback, curr) => {
    if (curr.left !== null) inOrderHelper(callback, curr.left);
    callback(curr);
    if (curr.right !== null) inOrderHelper(callback, curr.right);
  };

  const inOrder = (callback) => {
    if (typeof callback !== "function") throw new Error("callback should be a function.")
    if (_root === null) return;
    inOrderHelper(callback, _root);
  };

  const preOrderHelper = (callback, curr) => {
    callback(curr);
    if (curr.left !== null) preOrderHelper(callback, curr.left);
    if (curr.right !== null) preOrderHelper(callback, curr.right);
  };

  const preOrder = (callback) => {
    if (typeof callback !== "function") throw new Error("callback should be a function.")
    if (_root === null) return;
    preOrderHelper(callback, _root);
  };

  const postOrderHelper = (callback, curr) => {
    if (curr.left !== null) postOrderHelper(callback, curr.left);
    if (curr.right !== null) postOrderHelper(callback, curr.right);
    callback(curr);
  };

  const postOrder = (callback) => {
    if (typeof callback !== "function") throw new Error("callback should be a function.")
    if (_root === null) return;
    postOrderHelper(callback, _root);
  };

  const heightHelper = (node, height) => {
    if (node === null) return height;
    height++;
    let leftHeight = heightHelper(node.left, height);
    let rightHeight = heightHelper(node.right, height);
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  };

  const height = (node) => {
    return heightHelper(node, 0);
  };

  const depth = (node) => {
    if (_root === null) {
      return 0;
    }
    let curr = _root;
    let d = 0;
    while (curr !== null) {
      if (curr === node) return d;
      d++;
      curr = curr.data < node.data ? curr.right : curr.left;
    }
    throw new Error("node not found");
  };

  const isBalancedHelper = (node) => {
    if (node === null) return true;
    return (
      Math.abs(height(node.left) - height(node.right)) <= 1 &&
      isBalancedHelper(node.left) &&
      isBalancedHelper(node.right)
    );
  };

  const isBalanced = () => {
    return isBalancedHelper(_root);
  };

  const toList = () => {
    if (_root === null) return [];
    let nodes = [];
    let res = [];
    nodes.push(_root);
    while (nodes.length) {
      let node = nodes.shift();
      res.push(node.data);
      if (node.left !== null) nodes.push(node.left);
      if (node.right !== null) nodes.push(node.right);
    }
    return res;
  };

  const rebalance = () => {
    let list = toList();
    buildTree(list);
  };

  return {
    buildTree,
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance
  }
};
