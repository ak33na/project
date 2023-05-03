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
export var smiles = Kekule.IO.saveFormatData(mol, 'smi');
console.log('SMILES: ', smiles);



// Output MOL2k
var mol2k = Kekule.IO.saveFormatData(mol, 'mol');
console.log('MOL 1: \n', mol2k);

var renderType = Kekule.Render.RendererType.R2D//R3D  // do 2D or 3D drawing

// parent element, we will draw inside it
var parentElem = document.getElementById('mol built');
// clear parent elem
Kekule.DomUtils.clearChildContent(parentElem);

// create painter, bind with molecule
var painter = new Kekule.Render.ChemObjPainter(renderType, mol);

// create context inside parentElem
var dim = Kekule.HtmlElementUtils.getElemOffsetDimension(parentElem); // get width/height of parent element
var context = painter.createContext(parentElem, dim.width, dim.height); // create context fulfill parent element

// at last, draw the molecule at the center of context
painter.draw(context, {'x': dim.width / 2, 'y': dim.height / 2});

// Create arrow glyph with initial parameters
var glyph = new Kekule.Glyph.StraightLine('glyph1', 1, {
      'startArrowType': Kekule.Glyph.ArrowType.OPEN,
      'startArrowSide': Kekule.Glyph.ArrowSide.REVERSED,
      'startArrowWidth': 0.25,
      'startArrowLength': 0.25,
      'endArrowType': Kekule.Glyph.ArrowType.OPEN,
      'endArrowSide': Kekule.Glyph.ArrowSide.SINGLE,
      'endArrowWidth': 0.25,
      'endArrowLength': 0.25,
      'lineLength': 1.5,
      'lineGap': 0.1,
      'lineCount': 2
    });
// create new painter, bind with glyph
var painter = new Kekule.Render.ChemObjPainter(Kekule.Render.RendererType.R2D, glyph);
// draw the glyph at the center of context we previous created
painter.draw(context, {'x': dim.width / 2, 'y': dim.height / 2});




//Use the smiles variable to search for the chemical name for that structure


