const subscribers = [];
let molecule = new Kekule.Molecule();

export function getMolecule() {
  return molecule;
}

export function setMolecule(newMolecule) {
  molecule = newMolecule;
  notifySubscribers();
}

export function subscribe(callback) {
    subscribers.push(callback);
}


export function unsubscribe(callback) {
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
}

import {smilesPentane} from './main.js';
import {smilesMethylbutane} from './main.js';

function notifySubscribers() {
    subscribers.forEach(callback => callback(molecule));
}

var atom= 'C';
molecule.appendAtom(atom);

let bondi = 0;
let benzi = 0;
let ri = 0;

function declareCarbon() {
    atom = 'C';
}

function declareOxygen() {
    atom = 'O';
}

function declareNitrogen() {
    atom = 'N';
}

function declareHalogen() {
    atom = 'X';

}

function declareBond() {
    let k = 'bond';
    console.log("Declare bond works");
    bondi++;
    eval('var ' + k + bondi + '= ' + '"bond"' + ';');

}

function declareBenzene() {
    let k = 'phen';
    console.log("Declare benzene works");
    benzi++;
    eval('var ' + k + benzi + '= ' + '"⌬"' + ';');
}

function declareR() {
    let k = 'R';
    console.log("Declare R works");
    ri++;
    eval('var ' + k + ri + '= ' + '"R"' + ';');
}

function appendRecent() {
    console.log("append recent works");
    molecule.appendAtom(atom);
    var formula = molecule.calcFormula();
    console.log('Formula of molecule: ', formula.getText());
}

function setPentane(){
    document.getElementById("builder").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/5/52/N-Pentan.png', style = 'height: 100%; width: 100%; position:relative;' >";
}

function setMethylbutane(){
    document.getElementById("builder").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Isopentane.svg/2560px-Isopentane.svg.png', style = 'height: 100%; width: 100%; position:relative;' >";
}

function setEthanol(){
    document.getElementById("builder").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Ethanol-2D-flat.png/640px-Ethanol-2D-flat.png', style = 'height: 100%; width: 100%; position:relative;' >";
}

function setDimethylEther(){
    document.getElementById("builder").innerHTML = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Dimethyl_ether_Structural_Formulae.svg/1280px-Dimethyl_ether_Structural_Formulae.svg.png', style = 'height: 100%; width: 100%; position:relative;' >";
}

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
          console.log(CID);
  
          // Only `delay` is able to resolve or reject the promise
          setTimeout(function() {
  
  //INSIDE THE SETTIMEOUT FUNCTION, THE CID IS USED TO GET THE PROPERTIES.
  
  
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

document.getElementById("carbonButton").addEventListener("click", declareCarbon); 

document.getElementById("oxygenButton").addEventListener("click", declareOxygen); 

document.getElementById("nitrogenButton").addEventListener("click", declareNitrogen); 

document.getElementById("haloButton").addEventListener("click", declareHalogen); 

document.getElementById("bondButton").addEventListener("click", declareBond); 

document.getElementById("benzeneButton").addEventListener("click", declareBenzene); 

document.getElementById("rButton").addEventListener("click", declareR); 

document.getElementById("builder").addEventListener("click", appendRecent, setMolecule);

document.getElementById("pentaneB").addEventListener("click", function() {
    setPentane();
    getCID(smilesPentane);
  });

document.getElementById("methylbutaneB").addEventListener("click", function() {
    setMethylbutane();
    getCID(smilesMethylbutane);
});

document.getElementById("ethanolB").addEventListener("click", setEthanol);

document.getElementById("dimethylEtherB").addEventListener("click", setDimethylEther);

  