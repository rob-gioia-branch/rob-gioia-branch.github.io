function loadCharacterImages() {
  loadCharacterImage("620", "marvel1");
}

async function loadCharacterImage(characterID, elementID) {
  const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + characterID + ".json");
  const jsonData = await response.json();
  const image = json.character.images["lg"];
  document.getElementById(element).src=image;
}
