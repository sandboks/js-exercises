// merge sort

// Build a function mergeSort that takes in an array and returns a sorted array, using a recursive merge sort methodology. An input of [3, 2, 1, 13, 8, 5, 0, 1] should return [0, 1, 1, 2, 3, 5, 8, 13], and an input of [105, 79, 100, 110] should return [79, 100, 105, 110].

// take two presorted arrays
// compare the leftmost elements. Whichever is bigger, add to the "sorted" array
// do this until we've done every element in both arrays

// if only one number, quit
// else:

// sort left numbers
// sort right numbers
// final merging

function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;

    let indexToSplit = Math.round(arr.length / 2);
    let left = arr.slice(0, indexToSplit);
    let right = arr.slice(indexToSplit);

    /*
    console.log(left);
    console.log(right);
    console.log(`left: [${left}] / right: [${right}]`);
    */

    let leftArr = mergeSort(left);
    //console.log(`sorted left: [${leftArr}]`);
    let rightArr = mergeSort(right);
    //console.log(`sorted right: [${rightArr}]`);

    let sorted = [];

    //console.log(`left: ${leftArr} / right: ${rightArr}`);

    while (leftArr.length > 0 || rightArr.length > 0) {
        if (leftArr.length == 0) {
            sorted.push(rightArr.shift());
        }
        else if (rightArr.length == 0) {
            sorted.push(leftArr.shift());
        }
        else {
            if (rightArr[0] > leftArr[0]) {
                sorted.push(leftArr.shift());
            }
            else {
                sorted.push(rightArr.shift());
            }
        }
    }

    //console.log(`sorted: [${sorted}]`);
    return sorted;
}

console.log(mergeSort([2, 1, 5, 3, 0]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));