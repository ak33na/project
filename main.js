// Pentane
var pentane = new Kekule.Molecule();

// Create atoms in molecule, adding hydrogens unnecessary
var carbon1 = pentane.appendAtom('C');
var carbon2 = pentane.appendAtom('C');
var carbon3 = pentane.appendAtom('C');
var carbon4 = pentane.appendAtom('C');
var carbon5 = pentane.appendAtom('C');

// Must append bonds between atoms, otherwise registered as unbonded
pentane.appendBond([carbon1, carbon2], 1);
pentane.appendBond([carbon2, carbon3], 1);
pentane.appendBond([carbon3, carbon4], 1);
pentane.appendBond([carbon4, carbon5], 1);

// Calculate and output the formula
var formula = pentane.calcFormula();
console.log('Formula: ', formula.getText());

// Output Simplified Molecular Input Line Entry System (SMILES)
export var smilesPentane = Kekule.IO.saveFormatData(pentane, "smi");
console.log('SMILES: ', smilesPentane);

// Output MOL2k
var mol2k = Kekule.IO.saveFormatData(pentane, 'mol');
console.log('MOL 1: \n', mol2k);

// Methylbutane
var methylbutane = new Kekule.Molecule();

// Create atoms in the molecule
carbon1 = methylbutane.appendAtom('C');
carbon2 = methylbutane.appendAtom('C');
carbon3 = methylbutane.appendAtom('C');
carbon4 = methylbutane.appendAtom('C');
carbon5 = methylbutane.appendAtom('C');

// Append bonds between atoms to form the molecule
methylbutane.appendBond([carbon1, carbon2], 1);
methylbutane.appendBond([carbon2, carbon3], 1);
methylbutane.appendBond([carbon2, carbon4], 1);
methylbutane.appendBond([carbon4, carbon5], 1);

// Output Simplified Molecular Input Line Entry System (SMILES)
export var smilesMethylbutane = Kekule.IO.saveFormatData(methylbutane, "smi");

// Ethanol
var ethanol = new Kekule.Molecule();

// Create atoms in the molecule
carbon1 = ethanol.appendAtom('C');
carbon2 = ethanol.appendAtom('C');
var oxygen1 = ethanol.appendAtom('O');
var hydrogen1 = ethanol.appendAtom('H');

// Append bonds between atoms
ethanol.appendBond([carbon1, carbon2], 1);
ethanol.appendBond([carbon2, oxygen1], 1);
ethanol.appendBond([oxygen1, hydrogen1], 1);

// Output Simplified Molecular Input Line Entry System (SMILES)
export var smilesEthanol = Kekule.IO.saveFormatData(ethanol, "smi");
console.log('Ethanol: ', smilesEthanol);

// Methoxymethane
var methoxymethane = new Kekule.Molecule();

// Create atoms in the molecule
carbon1 = methoxymethane.appendAtom('C');
carbon2 = methoxymethane.appendAtom('C');
oxygen1 = methoxymethane.appendAtom('O');

// Append bonds between atoms
methoxymethane.appendBond([carbon1, oxygen1], 1);
methoxymethane.appendBond([oxygen1, carbon2], 1);

// Output Simplified Molecular Input Line Entry System (SMILES)
export var smilesMethoxymethane = Kekule.IO.saveFormatData(methoxymethane, 'smi');
