var molecule = new Kekule.Molecule();
let index = 0;
var C1 =molecule.appendAtom('C');

function createCarbon() {
    index++;
    var index = molecule.appendAtom('C');

}

var moleculeFormula = molecule.calcFormula();
console.log('Formula: ', moleculeFormula.getText());