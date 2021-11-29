const crypto = require('crypto')

const symbols = {
    0: "♠",
    1: "♥",
    2: "♦",
    3: "♣",
}

const multipleSymbols = {
    0: "♠",
    1: "♥",
    2: "♦",
    3: "♣",
    4: "X",
    5: "°",
    6: "~",
    7: "@",
}

/**
 * Start one draw over 4 symbols
 */
const tirage = () => {

    const newArray = []
   
    for (let i = 0; i < 4; i++) {
        newArray.push(symbols[crypto.randomInt(0, 4)])
    }

    console.log('Random Number generated : ', newArray.join(' '));
}

/**
 * Check probability of sort 3 same symbol of 8 element over 100 iterations
 */
const checkProbability = () => {
    const newArray = []
    let totalCount = 0
   
    for (let j = 0; j < 100; j++) {

        const uniqueArray = []

        for (let i = 0; i < 4; i++) {
            uniqueArray.push(multipleSymbols[crypto.randomInt(0, 8)])
        }

        let count = {};
        uniqueArray.forEach(function(i) { count[i] = (count[i] || 0) + 1; });
        
        Object.keys(count).forEach(element => {
            if (count[element] === 3) {
                totalCount += 1
            }
        })

        newArray.push(uniqueArray)
    }

    console.log('Total count of 3 same symbols over 100 iterations : ', totalCount)
}


tirage()
checkProbability()