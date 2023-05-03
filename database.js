// JavaScript file
import {smiles} from './main.js';
getCID(smiles);

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
        //console.log(CID);

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
                        })

//Melting Point
var meltingPoint = 0;
    fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Melting%20Point')
      .then(result => result.json())
      .then((data) => {
        meltingPoint = (data["Record"].Section[0].Section[0].Section[0].Information[1].Value.StringWithMarkup[0].String);

console.log(meltingPoint);
      })

//Boiling Point  
var boilingPoint = 0;
    fetch('https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/' + CID + '/JSON?heading=Boiling%20Point')
      .then(result => result.json())
      .then((data) => {
        boilingPoint = (data["Record"].Section[0].Section[0].Section[0].Information[1].Value.StringWithMarkup[0].String);

console.log(boilingPoint);
//Prints name of compound
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


