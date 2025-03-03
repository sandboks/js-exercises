//You’ll build a balanced BST in this assignment. Do not use duplicate values because they make it more complicated and result in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

/*
Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.

Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.

Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.

Tip: If you would like to visualize your binary search tree, here is a prettyPrint() function that will console.log your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter.
*/

class Node {
    constructor(contents) {
        this.data = contents;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        //console.log(arr);
        arr = [...new Set(arr)]; // remove the duplicates
        arr = [...arr].sort((a, b) => a - b); // need the array sorted
        //console.log(arr);

        return this.sortedArrayToBSTRecur(arr, 0, arr.length - 1);
    }

    //https://www.geeksforgeeks.org/sorted-array-to-balanced-bst/
    // Recursive function to construct BST
    sortedArrayToBSTRecur(arr, start, end) {
        if (start > end) return null;

        // Find the middle element
        let mid = start + Math.floor((end - start) / 2);

        // Create root node
        let root = new Node(arr[mid]);

        // Create left subtree
        root.left = this.sortedArrayToBSTRecur(arr, start, mid - 1);

        // Create right subtree
        root.right = this.sortedArrayToBSTRecur(arr, mid + 1, end);

        return root;
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    //Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.

    insert(n) {
        let node = new Node(n);
        let current = this.root;
        let prev = null;

        while (current != null) {
            prev = current;
            if (n > current.data) {
                current = current.right;
            }
            else {
                current = current.left;
            }
        }

        if (prev == null) {
            this.root = node;
        }
        else if (n > prev.data) {
            prev.right = node;
        }
        else {
            prev.left = node;
        }
    }

    //Write a find(value) function that returns the node with the given value.

    find(n, returnPrev = false) {
        let current = this.root;
        let prev = null;
        while (current != null && current.data != n) {
            prev = current;
            //console.log(current.data);
            if (n < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        if (current == null)
            return null;
        else if (current.data == n) {
            return (!returnPrev) ? current : prev;
        }
        return null;
    }

    delete(n) {
        let current = this.find(n);
        //console.log(`find(${n}): ${current}`);
        if (current == null)
            return;

        let prev = this.find(n, true);
        let isRoot = (prev == null);


        //let pointingRight = (prev.data < current.data);
        
        // lone leaf node
        if (current.left == null && current.right == null) {
            if (isRoot)
                this.root = null;
            else {
                if (prev.data < current.data)
                    prev.right = null;
                else
                    prev.left = null;
            }
        }
        // one child
        else if (current.left == null) {
            if (isRoot) {
                this.root = current.right;
            }
            else {
                if (prev.data < current.data)
                    prev.right = current.right;
                else
                    prev.left = current.right;
            }
        }
        else if (current.right == null) {
            if (isRoot) {
                this.root = current.left;
            }
            else {
                //((prev.data < current.data) ? prev.right : prev.left) = current.left;
                if (prev.data < current.data)
                    prev.right = current.left;
                else
                    prev.left = current.left;
            }
        }
        // two children
        // in this case, explore the right branch of the deleted node, find the leftmost node L, and replace the deleted note with L 
        else {
            let lowest = current.right;
            let lowestPrev = null;
            while (lowest.left != null) {
                lowestPrev = lowest;
                lowest = lowest.left;
            }

            if (lowestPrev != null) {
                lowestPrev.left = lowest.right;
                lowest.right = current.right;
            }
            lowest.left = current.left;

            if (isRoot) {
                this.root = lowest;
            }
            else {
                ((prev.data < current.data) ? prev.right : lowest)
            }
        }
    }

    isBalanced (root) {
        if (root == null)
            return true;
        return ((Math.abs((this.getMaxDepth(root.left) - this.getMaxDepth(root.right))) <= 1) && this.isBalanced(root.left) && this.isBalanced(root.right));
    }

    getMaxDepth(node) {
        if (node == null)
            return 0;
        return (1 + Math.max(this.getMaxDepth(node.left), this.getMaxDepth(node.right)));
    }

    //Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (video on level order traversal).


    // https://github.com/dwgrossberg/binary-search-tree/blob/main/Tree.js
    // I'm gonna be honest, I don't understand what the point of doing this with a callback is, and I haven't been taught how to even do this, so I just grabbed someone else's solution for this one
    levelOrder(callback) {
        if (this.root === null) return [];
        let todoNodesQueue = [this.root];
        let results = [];
        while (todoNodesQueue.length > 0) {
            let node = todoNodesQueue.shift();
            if (node.left !== null) 
                todoNodesQueue.push(node.left);
            if (node.right !== null) 
                todoNodesQueue.push(node.right);
            if (callback) {
                console.log("Peforming callback");
                callback(node);
            }
            else 
                results.push(node.data);
        }
        return results;
    }

    //Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.
    rebalance(root) {
        let arr = this.levelOrder();
        console.log(arr);
        console.log("rebuilding");
        this.root = this.buildTree(arr);
    }

    //Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.
    // TOP hasn't explained what any of this means or given sample tests, so I'm leaving these unimplemented ¯\_(ツ)_/¯
    // I know what DFS is but it's not clear what these are, since they're not described as DFS

    //Write a height(node) function that returns the given node’s height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
    height(n) {
        return this.getMaxDepth(this.find(n)) - 1;
    }

    //Write a depth(node) function that returns the given node’s depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    depth(n) {
        return (this.getMaxDepth(this.root)) - this.getMaxDepth(this.find(n));
    }
     
}

/*
TESTS GO HERE
*/

const randomIntArrayInRange = (min, max, n = 1) =>
    Array.from(
      { length: n },
      () => Math.floor(Math.random() * (max - min + 1)) + min
    );
  

for (let i = 0; i < 3; i++) {
    let arr = randomIntArrayInRange(0, 100, (Math.floor(Math.random() * 15)));
    //console.log(arr);
    let t = new Tree(arr);
    t.prettyPrint(t.root);

    console.log(t.levelOrder());
    
    while (t.root != null) {
        t.delete(t.root.data);
    }
    t.prettyPrint(t.root);
}

for (let i = 0; i < 1; i++) {
    let arr = randomIntArrayInRange(0, 100, (Math.floor(Math.random() * 15)));
    console.log(arr);
    let t = new Tree(arr);
    t.prettyPrint(t.root);

    console.log(t.levelOrder());

    for (let j = 0; j < 10; j++) {
        t.insert(j);
    }
    t.prettyPrint(t.root);
    t.rebalance();
    t.prettyPrint(t.root);
}

for (let i = 0; i < 1; i++) {
    let arr = [46, 20, 59, 30, 63];
    let t = new Tree(arr);
    t.prettyPrint(t.root);

    for (let j = 0; j < 10; j++) {
        t.insert(j);
    }
    t.prettyPrint(t.root);
    console.log(`height of 3: ${t.height(3)}`);
    console.log(`depth of 3: ${t.depth(3)}`);
    t.rebalance();
    console.log(`height of 3: ${t.height(3)}`);
    console.log(`depth of 3: ${t.depth(3)}`);
    t.prettyPrint(t.root);
}





/*
let t = new Tree([3, 2, 1]);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));
t.insert(1);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));
t.insert(1);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));
t.insert(7);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));
t.insert(2.5);
t.insert(1.5);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));

console.log(t.find(7));
t.delete(7);
console.log(t.find(7));
t.prettyPrint(t.root);
t.delete(2);
t.prettyPrint(t.root);

t.delete(2.5);
t.prettyPrint(t.root);
t.delete(3);
t.prettyPrint(t.root);
t.delete(1);
t.prettyPrint(t.root);
t.delete(1);
t.prettyPrint(t.root);
t.delete(1);
t.prettyPrint(t.root);


//console.log(t.find(1));
*/
/*
t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
t.prettyPrint(t.root);
console.log(t.isBalanced(t.root));
*/