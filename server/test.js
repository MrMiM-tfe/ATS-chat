//              c                                                 n
//              |------------------------------------------------->
//              0         1         2         3         4         5         6         7
let list = [{ r : 1 },{ r : 2 },{ r : 3 },{ r : 4 },{ r : 5 },{ r : 6 },{ r : 7 },{ r : null }]


//                                                                n         c
//              0         1         2         3         4         5         6         7
let nl   = [{ r : 1 },{ r : 2 },{ r : 3 },{ r : 4 },{ r : 5 },{ r : 6 },{ r : 7 },{ r : null }]

// C is item that you want to reposition
// N is item that C is gone take its palace
// r is refrense

const myC = 5
const myN = 5

let c = list[myC]
let n = list[myN]

let pc = list[myC-1]
console.log(n, c, pc);

if (c != n) {

if (pc) {pc.r = c.r}
c.r = n.r
n.r = myC

}

console.log(n, c, pc);