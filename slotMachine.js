const crypto = require('crypto')

const symbols = {
    0: "♠",
    1: "♥",
    2: "♦",
    3: "♣",
}

const tirage = () => {

    const newArray = []
   
    for (let i = 0; i < 4; i++) {
        newArray.push(symbols[crypto.randomInt(0, 4)])
    }

    console.log('Random Number generated : ', newArray.join(' '));
}


tirage()