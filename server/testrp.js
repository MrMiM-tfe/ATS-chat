//              pn        n                            pc         c
//                        <---------------------------------------|
//              0         1         2         3         4         5         6         7
let list = [{ r : 1 },{ r : 2 },{ r : 3 },{ r : 4 },{ r : 5 },{ r : 6 },{ r : 7 },{ r : null }]


//                        c                                                           n
//              0         7         2         3         4         5         6         1
let nl   = [{ r : 7 },{ r : 2 },{ r : 3 },{ r : 4 },{ r : 1 },{ r : 6 },{ r : 1 },{ r : null }]

// C is item that you want to reposition
// N is item that C is gone take its palace
// r is refrense

const myC = 7
const myN = 0

let c = list[myC]
let n = list[myN]

let pc = list[myC-1]
let pn = list[myN-1]

if (!pn) {
    
}

let pnr = pn.r
pn.r = pc.r

let nr = n.r
n.r = c.r

pc.r = pnr // pn.r

c.r = nr // n.r

console.log(pn, c, pc, n);