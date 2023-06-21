// JavaScript file
import {getMolecule, setMolecule, subscribe} from './buildmolecule.js';

const molecule = getMolecule();
console.log(molecule);

// Subscribe to updates
subscribe(updatedMolecule => {
    console.log('Received updated molecule:', updatedMolecule);
});

// Update the molecule variable
const newMolecule = new Kekule.Molecule();
setMolecule(newMolecule);

var moleculeFormula = molecule.calcFormula();
console.log('Formula in paint', moleculeFormula.getText());

var renderType = Kekule.Render.RendererType.R2D//R3D  // do 2D or 3D drawing

// parent element, we will draw inside it
var parentElem = document.getElementById('mol-built');
// clear parent elem
Kekule.DomUtils.clearChildContent(parentElem);

// create painter, bind with molecule
var painter = new Kekule.Render.ChemObjPainter(renderType, molecule);

// create context inside parentElem
var dim = Kekule.HtmlElementUtils.getElemOffsetDimension(parentElem); // get width/height of parent element
var context = painter.createContext(parentElem, dim.width, dim.height, { renderConfig: { useBondsBgDrawing: true } });
// at last, draw the molecule at the center of context
painter.draw(context, {'x': dim.width, 'y': dim.height / 2});

// Create arrow glyph with initial parameters
// var glyph = new Kekule.Glyph.StraightLine('glyph1', 1, {
//       'startArrowType': Kekule.Glyph.ArrowType.OPEN,
//       'startArrowSide': Kekule.Glyph.ArrowSide.REVERSED,
//       'startArrowWidth': 0.25,
//       'startArrowLength': 0.25,
//       'endArrowType': Kekule.Glyph.ArrowType.OPEN,
//       'endArrowSide': Kekule.Glyph.ArrowSide.SINGLE,
//       'endArrowWidth': 0.25,
//       'endArrowLength': 0.25,
//       'lineLength': 1.5,
//       'lineGap': 0.1,
//       'lineCount': 2
//     });
// create new painter, bind with glyph
// var painter = new Kekule.Render.ChemObjPainter(Kekule.Render.RendererType.R2D, glyph);
// draw the glyph at the center of context we previous created
// painter.draw(context, {'x': dim.width / 2, 'y': dim.height / 2});

