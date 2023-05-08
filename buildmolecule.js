var molecule = new Kekule.Molecule();
let index = 0;
var C1 =molecule.appendAtom('C');

let carboni = 1;
let oxyi = 0;
let nitroi = 0;
let haloi = 0;
let bondi = 0;
let benzi = 0;
let ri = 0;

function declareCarbon() {
    let k = 'C';
    console.log("Declare carbon works");
    carboni++;
    eval('var ' + k + carboni + '= ' + 'C' + ';');
}

function declareOxygen() {
    let k = 'O';
    console.log("Declare oxygen works");
    oxyi++;
    eval('var ' + k + oxyi + '= ' + 'O' + ';');
}

function declareNitrogen() {
    let k = 'N';
    console.log("Declare nitrogen works");
    nitroi++;
    eval('var ' + k + nitroi + '= ' + 'N' + ';');
}

function declareHalogen() {
    let k = 'X';
    console.log("Declare halogen works");
    haloi++;
    eval('var ' + k + haloi + '= ' + 'X' + ';');

}

function declareBond() {
    let k = 'bond';
    console.log("Declare bond works");
    bondi++;
    eval('var ' + k + bondi + '= ' + 'bond' + ';');

}

function declareBenzene() {
    console.log("Declare benzene works");
}

function declareR() {
    console.log("Declare R works");
}
var moleculeFormula = molecule.calcFormula();
console.log('Formula: ', moleculeFormula.getText());