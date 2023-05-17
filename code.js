var marvelCharacterIds = ["620", "332", "149", "659", "717", "423", "196", "374"]; 
var marvelElementIds = ["marvel1", "marvel2", "marvel3", "marvel4", "marvel5", "marvel6", "marvel7", "marvel8"];

var dcCharacterIds = ["70", "644", "298", "266", "370", "514", "558", "63"];
var dcElementIds = ["dc1", "dc2", "dc3", "dc4", "dc5", "dc6", "dc7", "dc8"]; 

var navbar;
var topOffset = 0;

var characters = {};

var homeNavButton;
var marvelNavButton;
var dcNavButton;
var listOfNavButtons;
var qrCodeImage;

function stickynavbar() {
  if (window.scrollY > topOffset) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
}

function setNavButtonActive(navButton) {
  for(var i = 0; i < listOfNavButtons.length; i++) {
    currentButton = listOfNavButtons[i];
    if(navButton === listOfNavButtons[i]) {
      currentButton.classList.add('active');
    } else {
      currentButton.classList.remove('active');
    }
  }
}

function handleHomeButtonClicked() {
  showListView();
  setNavButtonActive(homeNavButton);
  qrCodeImage.src = '';
}

function handleMarvelButtonClicked() {
  setNavButtonActive(marvelNavButton);
}

function handleDCButtonClicked() {
  setNavButtonActive(dcNavButton);
}

function showListView() {
  const listView = document.getElementById("list-view");
  const detailView = document.getElementById("detail-view");
  listView.hidden = false;
  detailView.hidden = true;
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
    let element = document.getElementById(elementID);
    element.src=character.getCharacterImage();
    element.addEventListener('click', function (e) {
      import("/utils.js").then((utilsModule) => {
        utilsModule.loadCharacterDetailView(characters[name]);
      });
  });
});
}

function onDocumentLoaded() {
  navbar = document.getElementById('topnav');
  homeNavButton = document.getElementById("home");
  marvelNavButton = document.getElementById("marvel");
  dcNavButton = document.getElementById("dc");
  qrCodeImage = document.getElementById("qr-image");
  listOfNavButtons = [homeNavButton, marvelNavButton, dcNavButton];
  topOffset = navbar.offsetTop;
  loadCharacterImages();
}

window.addEventListener('scroll', stickynavbar);
document.addEventListener("DOMContentLoaded", onDocumentLoaded);
