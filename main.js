var mol = new Kekule.Molecule();

// Create atoms in molecule, adding hydrogens unnecessary
var atomC1 = mol.appendAtom('C');
var atomC2 = mol.appendAtom('C');
var atomC3 = mol.appendAtom('C');
var atomC4 = mol.appendAtom('C');
var atomC5 = mol.appendAtom('C');

// Must append bonds between atoms, otherwise registered as unbonded
mol.appendBond([atomC1, atomC2], 2);
mol.appendBond([atomC2, atomC3], 1);
mol.appendBond([atomC3, atomC4], 1);
mol.appendBond([atomC4, atomC5], 1);

// Get formula
var formula = mol.calcFormula();
console.log('Formula: ', formula.getText());

// Output Simplified Molecular Input Line Entry System
var smiles = Kekule.IO.saveFormatData(mol, 'smi');
console.log('SMILES: ', smiles);

// Output MOL2k
var mol2k = Kekule.IO.saveFormatData(mol, 'mol');
console.log('MOL 2000: \n', mol2k);

