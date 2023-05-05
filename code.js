async function loadCharacterImages() {
  await loadCharacterImage("620", "marvel1");
  await loadCharacterImage("332", "marvel2");
  await loadCharacterImage("149", "marvel3");
  await loadCharacterImage("659", "marvel4");
  await loadCharacterImage("717", "marvel5");
  await loadCharacterImage("423", "marvel6");
  await loadCharacterImage("196", "marvel7");
  await loadCharacterImage("374", "marvel8");
  
  await loadCharacterImage("70", "dc1");
  await loadCharacterImage("644", "dc2");
  await loadCharacterImage("298", "dc3");
  await loadCharacterImage("266", "dc4");
  await loadCharacterImage("370", "dc5");
  await loadCharacterImage("514", "dc6");
  await loadCharacterImage("558", "dc7");
  await loadCharacterImage("63", "dc8");
}

async function loadCharacterImage(characterID, elementID) {
  const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/" + characterID + ".json");
  const jsonData = await response.json();
  const image = jsonData.images["lg"];
  
  document.getElementById(elementID).src=image;
}
