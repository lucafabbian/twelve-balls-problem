/*

PROBLEM:
    We have 12 balls, labelled between 1 and 12.
    11 of those balls have the same weight, but the remaining one is an intruder with
    a different weight.
    To find the intruder, you have a twin-pan balance. You may use it at most three times.

*/



// DEFINITION OF THE PROBLEM

// Possible results of the weight, referred to the first pan
enum results {
    up = 1,
    same = 0,
    down = -1,
}

type weightFunction = (group1 :Array<number>, group2: Array<number>) => results
type solveFunction = (weight : weightFunction) => number

const testSolution = (solve : solveFunction) => {
    for (let i = 1; i <=12; i++){

        let numberofcalls = 0
    
        const weight : weightFunction = (group1, group2) => {
            numberofcalls += 1
    
            if(numberofcalls > 3) throw "Limit of 3 calls exceeded!"
            if(group1.length !== group2.length) throw "Must weight the same number of balls in each plate"
    
            if(group1.includes(i)) return results.up
            if(group2.includes(i)) return results.down
    
            return results.same
        }
    
        const solution = solve(weight)
    
        console.log(`Real value: ${i}, solution found: ${solution}`)
    
    }    
}






// SOLUTION

/** This function takes a weight function as parameter and
 * returns the wrong-weight ball */
const solve : solveFunction = (weight) => {


    /** Solve the problem when just two balls left, using a known ball as comparison */
    const findBetweenTwo = (first : number, second: number, comparison: number) => 
        weight([first], [comparison]) === results.same ? second : first
    
    
    
    const w1 = weight([1, 2, 3, 4], [5, 6, 7, 8])


    if(w1 === results.same){
        // it means that the intruder is in the remaining [9, 10, 11, 12]
        const w2 = weight([1, 2], [11, 12])

        return w2 === results.same ? findBetweenTwo(9, 10, 1) : findBetweenTwo(11, 12, 1)
    }


    // Here we swapped half of the balls [3,4] => [7,8]
    // and then we substitude two suspected balls (4 and 5) with known ones (11 and 12)
    const w2 = weight([1, 2, 7, 8], [11, 6, 3, 12])

    if(w2 === results.same) return findBetweenTwo(4, 5, 11)

    // If the result of the weights are the same, it means the intruder ball is between
    // the ones we have not switched. 
    const remainingSuspects = w1 === w2 ? [1, 2, 6] : [7, 8, 3]

    // We do the "substitute and swap" trick again
    const w3 = weight([11, 12], [remainingSuspects[1], remainingSuspects[2]])
    if( w3 === results.same) return remainingSuspects[0] // the substituted ball
    return w3 === w2 ? remainingSuspects[2] : remainingSuspects[1]

}



testSolution(solve)








