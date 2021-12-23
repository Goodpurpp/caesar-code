let fs = require('fs')

let data = fs.readFileSync("code.txt", "utf8")
let line = data.split('\n')

let text = line[0]
let shift = ((Math.ceil(Math.random()*100)%33==0))? 1 : Math.ceil(Math.ceil(Math.random()*100))%33;
let message = ""
let alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

text = text.toLowerCase();

if (shift % 33 == 0) {
    console.log(text)
}
else {  
    for (let i = 0; i < text.length; i++) {
        if (alphabet.includes(text[i])) {
            let index = alphabet.indexOf(text[i])
            message += alphabet[(index + shift) % 33];
        } else {
            message += text[i]
        }
    }
}
console.log("Закодированный текст:"+message)
fs.writeFileSync("code.txt",message);
console.log("Файл успешно сохранен!")

