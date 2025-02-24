// Fibonacci sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144

function fibsRec(n) {
    if (n < 0)
        return "Error: invalid input";
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    return (fibsRec(n-1) + fibsRec(n-2));
}

function fibsArray(n) {
    let arr = [0, 1];
    for (let i = 2; i <= n; i++) {
        arr.push(arr[i-2] + arr[i-1]);
        //console.log("for loop run");
    }
    //console.log(arr);
    return arr;
}

let n = 20;

console.log(`Fibbonacci sequence for number "${n}:`);
console.log(fibsRec(n));
console.log(fibsArray(n));