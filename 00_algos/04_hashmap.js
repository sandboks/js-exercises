

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        //this.arr = [];
        this.bucketsArr = Array.from({ length: this.capacity }, () => new LinkedList());
        //Array.from({ length: capacity }, () => LinkedList());
    }

    Hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode = hashCode % this.capacity; // prevent integer overflow by capping the hashCode at every step of the loop
        }
     
        return hashCode;
      } 

    set(key, value) {
        // grow buckets if number keys >= (capacity * loadFactor)
        if (this.length() >= (this.capacity * this.loadFactor)) {
            console.log("Need to double buckets");
            this.ResizeBuckets();
        }
        
        let hash = this.Hash(key);
        console.log(`inserting [${key},${value}] into bucket ${hash}`);
        this.bucketsArr[hash].append(key, value);
    }

    //get(key) takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
        let hash = this.Hash(key);
        let value = this.bucketsArr[hash].GetValueFromKey(key);
        return value;
    }

    //keys() returns an array containing all the keys inside the hash map.
    keys() {
        return this.fetchKeysAndOrValues(true, false);
    }

    //entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        return this.fetchKeysAndOrValues(true, true);
    }

    fetchKeysAndOrValues(keys, values) {
        let arr = [];
        for (let i = 0; i < this.bucketsArr.length; i++) {
            let list = this.bucketsArr[i];
            arr.push(...list.fetchKeysAndOrValues(keys, values));
        }
        return arr;
    }

    //clear() removes all entries in the hash map.
    clear() {
        this.bucketsArr = Array.from({ length: this.capacity }, () => new LinkedList());
    }

    ResizeBuckets() {
        let prevArr = this.bucketsArr;
        this.capacity *= 2;

        this.clear();

        for (let i = 0; i < prevArr.length; i++) {
            let list = prevArr[i];
            let node = list.startNode;
            while (node != null) {
                this.set(node.key, node.value);
                node = node.next;
            }
        }
    }

    length() {
        let length = 0;
        for (let i = 0; i < this.capacity; i++) {
            length += this.bucketsArr[i].length();
        }
        return length;
    }
     
}

class LinkedList {
    constructor() {
        this.startNode = null;
        this.count = 0;
    }

    append(key, value) {
        //let newNode = new Node(key, value);
        if (this.startNode == null) {
            this.startNode = new Node(key, value);
            this.count++;
            return;
        }
        
        let current = this.startNode;
        if (current.key == key) {
            current.value = value;
            return;
        }
        while (current.next != null) {
            if (current.key == key) {
                current.value = value;
                return;
            }
            current = current.next;
        }
        current.next = new Node(key, value);
        this.count++;
    }

    length() {
        return this.count;
    }

    GetValueFromKey(key) {
        let current = this.startNode;
        while (current != null) {
            if (current.key == key)
                return current.value;
            current = current.next;
        }
        return null;
    }

    keys() {
        return this.fetchKeysAndOrValues(true, false);
    }

    entries() {
        return this.fetchKeysAndOrValues(true, true);
    }

    fetchKeysAndOrValues(keys, values) {
        let current = this.startNode;
        let arr = [];
        while (current != null) {
            //arr.push(current.key);
            if (keys && !values)
                arr.push(current.key);
            else if (!keys && values)
                arr.push(current.value);
            else if (keys && values)
                arr.push([current.key, current.value]);
            
            current = current.next;
        }
        //console.log(arr);
        return arr;
    }

    toString() {
        let current = this.startNode;
        let s = '';

        while (current != null) {
            s += `(${current.key},${current.value}) -> `
            current = current.next;
        }
        s += `NULL`;

        console.log(`[${s}]`);
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}




const test = new HashMap() // or HashMap() if using a factory

console.log(test.get('apple'));
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
console.log(test.length());
console.log(test.keys());

// After that, populate your hash map with the last node below. This will make your load levels exceed your load factor, triggering your hash map’s growth functionality and doubling its capacity:
test.set('moon', 'silver')
console.log(test.length());
console.log(test.get('hat'));
test.set('hat', 'burple');
console.log(test.get('hat'));
console.log(test.entries());
test.clear();
console.log(test.entries());
