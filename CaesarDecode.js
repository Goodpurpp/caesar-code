function readArray(){
    let fs = require('fs')
    let data = fs.readFileSync("freq.txt", "utf-8")
    let line = data.split('\n')
    let arr = new Array();
    let res = new Array();
    for (let i = 0; i < line.length; i++){
        s = line[i];
        arr = s.split(' ');
        res[arr[0]] = arr[1]
    }
    return res;
}


function getOccurrence(message, alphabet){
    message = message.toLowerCase();
    let table = new Array();
    let count = 0;
    for (let i = 0; i < message.length; i++) {
        let letter = message[i];
        if (alphabet.indexOf(letter)!=-1){
            if (table[letter] == undefined)
                table[letter] = 0;
            table[letter]++;
            count++;
        }
    }

    let result = new Array();
    for (let letter in table){
        let node = {
            letter: letter,
            occurrence: table[letter]/count
        }
        result.push(node);
    }

    result.sort((a, b) => {
        if (a.letter < b.letter) {
            return -1;
        }
        if (a.letter > b.letter) {
            return 1;
        }
        return 0;
    });
    return result;
}

function findShift(baseOccurrence, personalOccurrence, alphabet){
    let shifts = new Array();
    for (let shift = 0; shift<33;shift++){
        let summ = 0.0;
        let personalOccurrenceNew = personalOccurrence;
        for (let j=0; j<personalOccurrenceNew.length; j++){
            let node = personalOccurrence[j];

            number = (alphabet.indexOf(node.letter)+shift<33)?alphabet.indexOf(node.letter)+shift:alphabet.indexOf(node.letter)+shift-33;
            let origLetter = alphabet[number];
            summ+=(parseFloat(baseOccurrence[origLetter]).toFixed(7)-parseFloat(node.occurrence).toFixed(7));
        }
        shifts[shift] = summ;
    }

    let maxShift, max = -999;
    for (let i = 0; i < shifts.length; i++) {
        let element = shifts[i];
        if (element>max){
            max = element;
            maxShift = i;
        }
    }
    return maxShift;
}

function createUnswer(minShift, message, alphabet){
    message = message.toLowerCase();
    let result = "";
    for (let i = 0; i < message.length; i++) {
        let letter = message[i];
        if (alphabet.indexOf(letter)!=-1){
            let number = (alphabet.indexOf(letter)+minShift<33)?alphabet.indexOf(letter)+minShift:alphabet.indexOf(letter)+minShift-33;
            result+=alphabet[number];
            continue;
        }
        result+=letter;
    }
    return result;
}
let fs = require('fs')

let data = fs.readFileSync("code.txt", "utf8")
let text = data;

let alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
let occurrence = getOccurrence(text, alphabet);
let baseOccurrence = readArray()
let shift = findShift(baseOccurrence, occurrence, alphabet);
let ans=createUnswer(shift, text, alphabet);
console.log("Раскодированный текст:"+ans);
fs.writeFileSync("code.txt",ans);
console.log("Файл успешно раскодирован!")