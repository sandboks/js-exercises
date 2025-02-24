// example uses class syntax - adjust as necessary

class LinkedList {
    constructor() {
        this.startNode = null;
    }

    append(value) {
        let newNode = new Node(value);
        if (this.startNode == null) {
            this.startNode = newNode;
        }
        else {
            let current = this.startNode;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    prepend(value) {
        let oldHead = this.startNode;
        this.startNode = new Node(value);
        this.startNode.next = oldHead;
    }

    toString() {
        let current = this.startNode;
        let s = '';

        while (current != null) {
            s += `(${current.contents}) -> `
            current = current.next;
        }
        s += `NULL`;

        console.log(`[${s}]`);
    }
}

class Node {
    constructor(contents) {
        this.contents = contents;
        this.next = null;
    }
}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.prepend("COMBO BREAKER");
list.append("snake");
list.append("turtle");
list.toString();
// ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null
