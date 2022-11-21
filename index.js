 //Import
import clipboard from 'clipboardy';
import config from "./config/config.json" assert { type: "json" };



function generatePass(passLength) {
    let password = [];
    //Anti-Idiot Measures
    if(typeof passLength !== "number"){
       return console.log("Input must be numerical.");
    }
    //No Weak Passwords
    if(passLength < 12){
        return console.log("Passwords must be 12 or more characters.")
    }

    //No Silly Long Passwords
    if(passLength > 128){
        return console.log("Passwords over 128 characters not advised.")
    }
    //Choose a Random Char Type and push to array
    function chooseRand() {
        const randomNumber = Math.floor(Math.random() * 3)
        switch(randomNumber){
            case 0:
                return password.push(getAlpha());
            case 1:
                return password.push(getNum());
            case 2:
                return password.push(getSym());
        }
    }
    //Add Chars as many times as needed
    for (let i = 0; i < passLength; i++) {
        chooseRand();
    }
    //Smash that Array together
    password = password.join("");

    //Copy it to the Clipboard
    clipboard.writeSync(password);

    return console.log(`Created ${passLength} character password ${password} and copied to your clipboard.`)
}


//Choose either 1 or 0 to pick upper or lowercase then using Math.random() choose a letter and return it
function getAlpha() {
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const upLow = Math.floor(Math.random() * 2);
    switch (upLow) {
        case 0:
            return alphabet[Math.floor(Math.random() * (alphabet.length - 1))];
        case 1:
            return alphabet[Math.floor(Math.random() * (alphabet.length - 1))].toLowerCase();
        default:
            break;
    }
}
//Pick random Number using Math.random()
function getNum() {
    return Math.floor(Math.random() * 10).toString();
}

//Pick random Symbol using Math.random()
function getSym() {
    const symbols = ["~","!","@","#","$","%","^","&","(",")","_","-","+","=","{","[","}","]","|"];
    return symbols[Math.floor(Math.random() * (symbols.length - 1))];
}
//Lets go
generatePass(config.length)