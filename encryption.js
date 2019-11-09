'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the encryption function below.
function encryption(s) {
    const withoutSpacesString = s.replace(/ /g,'')
    const len = withoutSpacesString.length;
    const sqrtString = Math.sqrt(withoutSpacesString.length)
    let rows = Math.floor(sqrtString);
    let columns = Math.ceil(sqrtString);
    const reg = new RegExp(`(.){1,${columns}}`,"g");
    const arrayTrimed = withoutSpacesString.match(reg);
    const arrayEncripted= [];
    for( let i = 0; i<columns;i++){
        let wordEncripted = ""
        for(let j=0;j<arrayTrimed.length;j++){
            const letter = arrayTrimed[j][i];
            if(letter){
             wordEncripted+=letter;
            }
        }
        arrayEncripted.push(wordEncripted)

    }
    return arrayEncripted.join(" ")

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = encryption(s);

    ws.write(result + "\n");

    ws.end();
}
