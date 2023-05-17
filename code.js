var marvelCharacterIds = ["620", "332", "149", "659", "717", "423", "196", "374"]; 
var marvelElementIds = ["marvel1", "marvel2", "marvel3", "marvel4", "marvel5", "marvel6", "marvel7", "marvel8"];

var dcCharacterIds = ["70", "644", "298", "266", "370", "514", "558", "63"];
var dcElementIds = ["dc1", "dc2", "dc3", "dc4", "dc5", "dc6", "dc7", "dc8"]; 

var navbar;
var topOffset = 0;

var characters = {};

function stickynavbar() {
  if (window.scrollY > topOffset) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
}

function handleHomeButtonClicked() {
  const listView = document.getElementById("list-view");
  const detailView = document.getElementById("detail-view");
  listView.hidden = false;
  detailView.hidden = true;
  document.getElementById("home").classList.add('active');
  document.getElementById("marvel").classList.remove('active');
  document.getElementById("dc").classList.remove('active');
}

function handleMarvelButtonClicked() {
  document.getElementById("marvel").classList.add('active');
  document.getElementById("home").classList.remove('active');
  document.getElementById("dc").classList.remove('active');
}

function handleDCButtonClicked() {
  document.getElementById("dc").classList.add('active');
  document.getElementById("home").classList.remove('active');
  document.getElementById("marvel").classList.remove('active');
}

async function loadCharacterImages() {
  for(var i = 0; i < marvelCharacterIds.length; i++) {
    await loadCharacterImage(marvelCharacterIds[i], marvelElementIds[i]);
  }
    for(var i = 0; i < dcCharacterIds.length; i++) {
    await loadCharacterImage(dcCharacterIds[i], dcElementIds[i]);
  }
  window.allCharacters = characters;
  handleStartupSystemFinishedInitializing();
}

async function loadCharacterImage(characterID, elementID) {
  const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + characterID + ".json");
  const jsonData = await response.json();
  import("/character.js").then((characterModule) => {
    const character = new characterModule.Character(jsonData);
    const name = character.getCharacterName();
    characters[name] = character;
    window.character = character;
    const element = document.getElementById(elementID);
    element.src=character.getCharacterImage();
    element.addEventListener('click', function (e) {
      window.character = characters[name];
      import("/utils.js").then((utilsModule) => {
        utilsModule.loadCharacterDetailView();
      });
  });
});
}

function onDocumentLoaded() {
  navbar = document.getElementById('topnav');
  topOffset = navbar.offsetTop;
  loadCharacterImages();
}

window.addEventListener('scroll', stickynavbar);
document.addEventListener("DOMContentLoaded", onDocumentLoaded);
