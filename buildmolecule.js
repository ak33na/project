// buildmolecule.js

// Import required modules
import { smilesPentane, smilesMethylbutane, smilesEthanol, smilesMethoxymethane } from './main.js';

// Declare global variables
const SUBSCRIBERS = [];
let molecule = new Kekule.Molecule();
const IMG_PENTANE_URL = 'https://upload.wikimedia.org/wikipedia/commons/5/52/N-Pentan.png';
const IMG_METHYLBUTANE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Isopentane.svg/2560px-Isopentane.svg.png';
const IMG_ETHANOL_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Ethanol-2D-flat.png/640px-Ethanol-2D-flat.png';
const IMG_METHOXYMETHANE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Dimethyl_ether_Structural_Formulae.svg/1280px-Dimethyl_ether_Structural_Formulae.svg.png';
// Function to get the current molecule
export function getMolecule() {
  return molecule;
}

// SMILES array 
const SMILES = [smilesPentane, smilesMethylbutane, smilesEthanol, smilesMethoxymethane];

// Image arrays
const IMAGES = [IMG_PENTANE_URL, IMG_METHYLBUTANE_URL, IMG_ETHANOL_URL, IMG_METHOXYMETHANE_URL];

// Function to set the molecule and notify subscribers
export function setMolecule(newMolecule) {
  molecule = newMolecule;
  notifySubscribers();
}

// Function to subscribe to molecule updates
export function subscribe(callback) {
    SUBSCRIBERS.push(callback);
}

// Function to unsubscribe from molecule updates
export function unsubscribe(callback) {
    const index = SUBSCRIBERS.indexOf(callback);
    if (index !== -1) {
      SUBSCRIBERS.splice(index, 1);
    }
}

// Function to notify subscribers about molecule updates
function notifySubscribers() {
    SUBSCRIBERS.forEach(callback => callback(molecule));
}

// Define atom types
var atom= 'C'; // Default atom type is carbon

// Append atom to the molecule
molecule.appendAtom(atom);

// Counter variables for bonds, benzene rings, and R groups
let bondi = 0;
let benzi = 0;
let ri = 0;


// Function to declare Carbon atom type
function declareCarbon() {
  atom = 'C';
}

// Function to declare Oxygen atom type
function declareOxygen() {
  atom = 'O';
}

// Function to declare Nitrogen atom type
function declareNitrogen() {
  atom = 'N';
}

// Function to declare Halogen atom type
function declareHalogen() {
  atom = 'X';
}

// Function to declare a bond
function declareBond() {
  let k = 'bond';
  bondi++;
  eval('var ' + k + bondi + '= ' + '"bond"' + ';');
}

// Function to declare a benzene ring
function declareBenzene() {
  let k = 'phen';
  benzi++;
  eval('var ' + k + benzi + '= ' + '"⌬"' + ';');
}

// Function to declare an R group
function declareR() {
  let k = 'R';
  ri++;
  eval('var ' + k + ri + '= ' + '"R"' + ';');
}

// Function to append the recent atom to the molecule
function appendRecent() {
  molecule.appendAtom(atom);
  var formula = molecule.calcFormula();
  console.log('Formula of molecule: ', formula.getText());
}

// Functions to set the image and fetch CID and properties for each molecule
function setPentane(){
    document.getElementById("builder").innerHTML = "<img src=" + IMAGES[0] + " style = 'height: 100%; width: 100%; position:relative;' >";
}

function setMethylbutane(){
    document.getElementById("builder").innerHTML = "<img src=" + IMAGES[1] + " style = 'height: 100%; width: 100%; position:relative;' >";
}

function setEthanol(){
    document.getElementById("builder").innerHTML = "<img src=" + IMAGES[2] + " style = 'height: 100%; width: 100%; position:relative;' >";
}

function setDimethylEther(){
    document.getElementById("builder").innerHTML = "<img src=" + IMAGES[3] + " style = 'height: 100%; width: 100%; position:relative;' >";
}

// Function to fetch CID for a given SMILES string
async function getCID(smiles) {
  
    //The Delay function that contains the async code
    function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
      //The async request
  
      fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/'+ smiles + '/property/MolecularFormula/JSON')
        .then(result => result.json())
        .then((data) => { //process the returned data 
          var CID = (data["PropertyTable"].Properties[0].CID); //get the value for the key CID  
          var MolecularFormula = (data["PropertyTable"].Properties[0].MolecularFormula);
          document.getElementById('formula').innerHTML = "Molecular formula: " + MolecularFormula;
          console.log(CID);
  
          // Only `delay` is able to resolve or reject the promise
          setTimeout(function() {
  
  //INSIDE THE SETTIMEOUT FUNCTION, THE CID IS USED TO GET THE PROPERTIES.
  
  // Function to fetch properties using CID
  function delayBeforeProperties(CID){
    return new Promise(function(resolve, reject) {
  
  //Solubility
  var solubility = 0;
    
      
      
  //get the name of the molecule from the property search.    fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Solubility')
        fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Solubility')
      .then(result => result.json())
      .then((data) => {
        solubility = (data["Record"].Section[0].Section[0].Section[0].Information[1].Value.StringWithMarkup[0].String)    
  
        console.log(solubility);
        document.getElementById('solubility').innerHTML = "Solubility: " + solubility;
                          })
  
  //Melting Point
  var meltingPoint = 0;
      fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Melting%20Point')
        .then(result => result.json())
        .then((data) => {
          meltingPoint = (data["Record"].Section[0].Section[0].Section[0].Information[1].Value.StringWithMarkup[0].String);
  
  console.log(meltingPoint);
  document.getElementById('meltingPoint').innerHTML = "Melting point: " + meltingPoint;
  
        })
  
  //Boiling Point  
  var boilingPoint = 0;
      fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Boiling%20Point')
        .then(result => result.json())
        .then((data) => {
          boilingPoint = (data["Record"].Section[0].Section[0].Section[0].Information[1].Value.StringWithMarkup[0].String);
  
  console.log(boilingPoint);
  document.getElementById('boilingPoint').innerHTML = "Boiling point: " + boilingPoint;
  
  //Prints name of compound
  document.getElementById('molName').innerHTML = "Name: " + data["Record"].RecordTitle;
  
  console.log(data["Record"].RecordTitle);
        })
  
  
  
      
      setTimeout(function() {
        resolve(solubility + " . " + meltingPoint + " . " + boilingPoint);
      }, 0);
    })
  }
  
  delayBeforeProperties(CID);
            
            //CID = (data["PropertyTable"].Properties[0].CID);
          //  resolve(CID); // After 3 seconds, resolve the promise with value 42
          }, 0);
        });
    })
  }
  
  
  
    
  delay()
    .then(/*Function resolves the promise and returns CID*/function(a) { // `delay` returns a promise
      var CID = a
      console.log(CID); // Log the value once it is resolved
      return CID;
    })
    .catch(function(a) {
      // Or do something else if it is rejected
      // (it would not happen in this example, since `reject` is not called).
    });  
  }




  
// document.getElementById("carbonButton").addEventListener("click", declareCarbon); 

// document.getElementById("oxygenButton").addEventListener("click", declareOxygen); 

// document.getElementById("nitrogenButton").addEventListener("click", declareNitrogen); 

// document.getElementById("haloButton").addEventListener("click", declareHalogen); 

// document.getElementById("bondButton").addEventListener("click", declareBond); 

// document.getElementById("benzeneButton").addEventListener("click", declareBenzene); 

// document.getElementById("rButton").addEventListener("click", declareR); 

// document.getElementById("builder").addEventListener("click", appendRecent, setMolecule);

document.getElementById("pentaneB").addEventListener("click", function() {
    setPentane();
    getCID(SMILES[0]);
    document.getElementById('isomers').innerHTML = "Structural isomers: 2-methylbutane, 2,2-dimethylpropane";
    document.getElementById('citation').innerHTML = "National Center for Biotechnology Information (2023). PubChem Compound Summary for CID 8003, Pentane";

  });

document.getElementById("methylbutaneB").addEventListener("click", function() {
    setMethylbutane();
    getCID(SMILES[1]);
    document.getElementById('isomers').innerHTML = "Structural isomers: pentane, 2,2-dimethylpropane";
    document.getElementById('citation').innerHTML = "National Center for Biotechnology Information (2023). PubChem Compound Summary for CID 6556, Isopentane";


});

// Note: Error with getCID function corresponding to ethanol SMILES. For future maintenance and expansion, test the database thoroughly.
document.getElementById("ethanolB").addEventListener("click", function() {
    setEthanol();
    document.getElementById('solubility').innerHTML = "Solubility: In water, miscible 1x10<sup>6</sup> mg/L at 25 °C";
    document.getElementById('boilingPoint').innerHTML = "Boiling point: 78.24 °C";
    document.getElementById('meltingPoint').innerHTML = "Melting point: -129.67 °C";
    document.getElementById('molName').innerHTML = "Name: Ethanol";
    document.getElementById('isomers').innerHTML = "Structural isomers: methoxymethane";
    document.getElementById('formula').innerHTML = "Molecular formula: C2H6O";
    document.getElementById('citation').innerHTML = "National Center for Biotechnology Information. PubChem Compound Summary for CID 702, Ethanol";


});

document.getElementById("dimethylEtherB").addEventListener("click", function() {
    setDimethylEther();
    getCID(SMILES[3]);
    document.getElementById('isomers').innerHTML = "Structural isomers: ethanol";
    document.getElementById('citation').innerHTML = "National Center for Biotechnology Information (2023). PubChem Compound Summary for CID 8254, Dimethyl Ether";

});

  