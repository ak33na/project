var molecule = new Kekule.Molecule();
let index = 0;

function createCarbon() {
    index++;
    var index = molecule.appendAtom('C');

}

var moleculeFormula = molecule.calcFormula();
console.log('Formula: ', moleculeFormula.getText());