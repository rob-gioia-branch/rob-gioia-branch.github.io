var marvelCharacterIds = ["620", "332", "149", "659", "717", "423", "196", "374"]; 
var marvelElementIds = ["marvel1", "marvel2", "marvel3", "marvel4", "marvel5", "marvel6", "marvel7", "marvel8"];

var dcCharacterIds = ["70", "644", "298", "266", "370", "514", "558", "63"];
var dcElementIds = ["dc1", "dc2", "dc3", "dc4", "dc5", "dc6", "dc7", "dc8"];

var navbar;
var topOffset = 0;
var character;

function stickynavbar() {
  if (window.scrollY > topOffset) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
}

function reloadHomepage() {
  var redirectToURL = 'https://rob-gioia-branch.github.io/';
  window.location.href = redirectToURL;
  window.location.reload(true);
}

async function loadCharacterImages() {
  for(var i = 0; i < marvelCharacterIds.length; i++) {
    await loadCharacterImage(marvelCharacterIds[i], marvelElementIds[i]);
  }
    for(var i = 0; i < dcCharacterIds.length; i++) {
    await loadCharacterImage(dcCharacterIds[i], dcElementIds[i]);
  }
}

async function loadCharacterImage(characterID, elementID) {
  const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + characterID + ".json");
  const jsonData = await response.json();
  character = new Character(jsonData);
  const image = jsonData.images["lg"];
  const qrCodeImage = jsonData.images["sm"];
  const name = jsonData.name;
  const element = document.getElementById(elementID);
  element.src=image;
  element.addEventListener('click', function (e) {
    const listView = document.getElementById("list-view");
    const detailView = document.getElementById("detail-view");
    listView.hidden = true;
    detailView.hidden = false;
    const characterName = document.getElementById("character-name");
    const characterImage = document.getElementById("character-image");
    characterName.innerHTML = name;
    characterImage.src = image;
  });
}

function onDocumentLoaded() {
  navbar = document.getElementById('topnav');
  topOffset = navbar.offsetTop;
}

window.addEventListener('scroll', stickynavbar);
document.addEventListener("DOMContentLoaded", onDocumentLoaded);

 export { character };

