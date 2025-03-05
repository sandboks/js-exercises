//Your task is to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

//Given enough turns, a knight on a standard 8x8 chess board can move from any square to any other square. Its basic move is two steps forward and one step to the side or one step forward and two steps to the side. It can face any direction.

//The vertices in this graph are each of the possible positions on the chessboard, represented by a pair of coordinates like [x, y], where x and y are between 0 and 7. The edges are the valid knight moves between vertices. For example, from [0,0], a knight can move to [2,1], [1,2], and so on. Each of these moves represents a connection between the vertex [0,0] and the other reachable vertices.

//While solving this problem, you don’t need to explicitly create a graph object with vertices and edges. Instead, you can think of the graph as implicit. The knight starts on a specific vertex, and the algorithm will dynamically explore all possible moves (edges) to other vertices (positions on the board) as it traverses the board.

//knightMoves([0,0],[1,2]) == [[0,0],[1,2]]

// shamelessly stole some ideas from this solution:
// https://github.com/JoshDevHub/Knight-Travails-JS/blob/main/knights-travails.js

const BOARDLENGTH = 8;
const KNIGHT_OFFSETS = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1]
];

class ChessSquare {
    constructor(x, y, dist, p = null) {
        this.xpos = x;
        this.ypos = y;
        this.distance = dist;
        this.prev = p;
    }

    GenerateSquareName() {
        return `${this.xpos}/${this.ypos}`;    
    }
}

// knightMoves([0,0],[1,2]);
const knightMoves = (start, destination) => {
    let found = false;
    let chessGrid = new Map();
    let startSquare = new ChessSquare(start[0], start[1], 0, null);
    let todoSpaces = [startSquare];
    //chessGrid.set(startSquare.GenerateSquareName(), startSquare);

    while (!found && todoSpaces.length > 0) {
        let currentSpace = todoSpaces.shift();
        //console.log(`current space: ${currentSpace}`);
        if (!withinBounds(currentSpace)) {
            console.log("OUT OF BOUNDS");
            continue;
        }
        let name = currentSpace.GenerateSquareName();
        //console.log(name);
        if (chessGrid.has(name)) {
            if (chessGrid.get(name).distance > currentSpace.distance) {
                console.log("FOUND A QUICKER VERSION: ");
                console.log(`prev: ${chessGrid.get(name).distance} / current: ${currentSpace.distance}`);
            }
            else {
                continue; // we already have a better version of this square, skip it
            }
        }
        
        chessGrid.set(name, currentSpace);
        if (currentSpace.xpos == destination[0] && currentSpace.ypos == destination[1]) {
            console.log("FOUND IT");

            let printout = "";
            while (currentSpace != null) {
                printout = `[${currentSpace.xpos},${currentSpace.ypos}] -> ` + printout;
                currentSpace = currentSpace.prev;
            }
            console.log(printout.slice(0, -4));
            found = true;
        }
        else {
            let newSpaces = GenerateSpacesOneMoveAway(currentSpace);
            //console.log("generate new spaces:");
            //console.log(newSpaces);
            todoSpaces.push(...newSpaces);
            //console.log(todoSpaces);
        }
    }
    if (!found)
        console.log("Couldn't find it! :((");
}

const withinBounds = (space) => {
    return (space.xpos >= 0) && (space.xpos < BOARDLENGTH) && (space.ypos >= 0) && (space.ypos < BOARDLENGTH);
}

const GenerateSpacesOneMoveAway = (space) => {
    let arr = [];
    for (let i = 0; i < KNIGHT_OFFSETS.length; i++) {
        let offset = KNIGHT_OFFSETS[i];
        let newSpace = new ChessSquare(space.xpos + offset[0], space.ypos + offset[1], space.distance + 1, space);
        if (withinBounds(newSpace))
            arr.push(newSpace);
    }
    return arr;
}


// knightMoves([0,0],[3,3]) == [[0,0],[2,1],[3,3]] or knightMoves([0,0],[3,3]) == [[0,0],[1,2],[3,3]]
//knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]] or knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]
knightMoves([3,1],[7,6]);

