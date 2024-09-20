const Node = (data = null, left = null, right = null) => {
  return { data, left, right };
};

const Tree = () => {
  let _root = null;

  const _buildTreeHelper = (list, min, max) => {
    if (min > max) return;
    let mid = Math.floor((max + min) / 2);
    insert(list[mid]);
    _buildTreeHelper(list, min, mid - 1);
    _buildTreeHelper(list, mid + 1, max);
  };

  const buildTree = (array) => {
    _root = null;
    let list = Array.from(new Set(array)).sort((a, b) => a - b);
    _buildTreeHelper(list, 0, list.length - 1);
  };

  const prettyPrint = (node = _root, prefix = "", isLeft = true) => {
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

  const _getHandler = (node, value) => {
    let prev = null;
    let curr = node;
    while (curr.data !== value) {
      prev = curr;
      if (curr.data < value) {
        if (curr.right === null) {
          return [null, null];
        }
        curr = curr.right;
      } else {
        if (curr.left === null) {
          return [null, null];
        }
        curr = curr.left;
      }
    }
    return [prev, curr];
  };

  const _deleteLeafNode = (prev, node) => {
    if (prev === null) {
      _root = null;
    } else if (prev.data < node.data) {
      prev.right = null;
    } else {
      prev.left = null;
    }
  };

  const _deleteOneChildNode = (prev, node) => {
    let next = node.left === null ? node.right : node.left;
    if (prev === null) {
      _root = next;
    } else if (prev.data < next.data) {
      prev.right = next;
    } else {
      prev.left = next;
    }
  };

  const _getRightMostNode = (node) => {
    let prev = node.right;
    if (prev.left === null) {
      node.right = prev.right;
      return prev;
    }
    while (prev.left.left !== null) {
      prev = prev.left;
    }
    let res = prev.left;
    prev.left = res.right;
    return res;
  };

  const _deleteChildrenNode = (prev, node) => {
    let next = _getRightMostNode(node);
    if (prev === null) {
      _root = next;
    } else {
      prev.right = next;
    }
    next.right = node.right;
    next.left = node.left;
  };

  const deleteItem = (value) => {
    let [prev, node] = _getHandler(_root, value);
    if (node === null) throw new Error("Value not exist!");
    if (node.left === null && node.right === null)
      return _deleteLeafNode(prev, node);
    if (node.left === null || node.right === null)
      return _deleteOneChildNode(prev, node);
    return _deleteChildrenNode(prev, node);
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
    if (typeof callback !== "function")
      throw new Error("callback should be a function.");
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

  const _inOrderHelper = (callback, curr) => {
    if (curr.left !== null) _inOrderHelper(callback, curr.left);
    callback(curr);
    if (curr.right !== null) _inOrderHelper(callback, curr.right);
  };

  const inOrder = (callback) => {
    if (typeof callback !== "function")
      throw new Error("callback should be a function.");
    if (_root === null) return;
    _inOrderHelper(callback, _root);
  };

  const _preOrderHelper = (callback, curr) => {
    callback(curr);
    if (curr.left !== null) _preOrderHelper(callback, curr.left);
    if (curr.right !== null) _preOrderHelper(callback, curr.right);
  };

  const preOrder = (callback) => {
    if (typeof callback !== "function")
      throw new Error("callback should be a function.");
    if (_root === null) return;
    _preOrderHelper(callback, _root);
  };

  const _postOrderHelper = (callback, curr) => {
    if (curr.left !== null) _postOrderHelper(callback, curr.left);
    if (curr.right !== null) _postOrderHelper(callback, curr.right);
    callback(curr);
  };

  const postOrder = (callback) => {
    if (typeof callback !== "function")
      throw new Error("callback should be a function.");
    if (_root === null) return;
    _postOrderHelper(callback, _root);
  };

  const _heightHelper = (node, height) => {
    if (node === null) return height;
    height++;
    let leftHeight = _heightHelper(node.left, height);
    let rightHeight = _heightHelper(node.right, height);
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  };

  const height = (node) => {
    return _heightHelper(node, 0);
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

  const _isBalancedHelper = (node) => {
    if (node === null) return true;
    return (
      Math.abs(height(node.left) - height(node.right)) <= 1 &&
      _isBalancedHelper(node.left) &&
      _isBalancedHelper(node.right)
    );
  };

  const isBalanced = () => {
    return _isBalancedHelper(_root);
  };

  const _toList = () => {
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
    let list = _toList();
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
    rebalance,
  };
};

const testBST = () => {
  const predefinedNumbers = [50, 30, 70, 30, 20, 40, 60, 80, 25, 35];
  console.log("Predefined Array:", predefinedNumbers);
  const bst = Tree();
  bst.buildTree(predefinedNumbers);

  console.log("Is tree balanced? ", bst.isBalanced());

  console.log("Pretty print:");
  bst.prettyPrint();

  console.log("Level Order:");
  bst.levelOrder((node) => console.log(node.data));

  console.log("Preorder:");
  bst.preOrder((node) => console.log(node.data));

  console.log("Inorder:");
  bst.inOrder((node) => console.log(node.data));

  console.log("Postorder:");
  bst.postOrder((node) => console.log(node.data));

  console.log("Tree before deleting:");
  bst.prettyPrint();

  const leafNodeValue = 35;
  console.log(`\nDeleting leaf node: ${leafNodeValue}`);
  bst.deleteItem(leafNodeValue);
  console.log("Tree after deleting leaf node:");
  bst.prettyPrint();

  const oneChildNodeValue = 70;
  console.log(`\nDeleting node with one child: ${oneChildNodeValue}`);
  bst.deleteItem(oneChildNodeValue);
  console.log("Tree after deleting node with one child:");
  bst.prettyPrint();

  const twoChildrenNodeValue = 60;
  console.log(`\nDeleting node with two children: ${twoChildrenNodeValue}`);
  bst.deleteItem(twoChildrenNodeValue);
  console.log("Tree after deleting node with two children:");
  bst.prettyPrint();

  const rootNodeValue = 40;
  console.log(`\nDeleting root node: ${rootNodeValue}`);
  bst.deleteItem(rootNodeValue);
  console.log("Tree after deleting root node:");
  bst.prettyPrint();

  [101, 102, 150, 200, 250].forEach((num) => bst.insert(num));

  console.log(
    "Is tree balanced after adding large numbers? ",
    bst.isBalanced()
  );

  bst.rebalance();

  console.log("Is tree balanced after rebalance? ", bst.isBalanced());

  console.log("Pretty print after rebalance:");
  bst.prettyPrint();

  console.log("Level Order after rebalance:");
  bst.levelOrder((node) => console.log(node.data));

  console.log("Preorder after rebalance:");
  bst.preOrder((node) => console.log(node.data));

  console.log("Inorder after rebalance:");
  bst.inOrder((node) => console.log(node.data));

  console.log("Postorder after rebalance:");
  bst.postOrder((node) => console.log(node.data));
};

testBST();
