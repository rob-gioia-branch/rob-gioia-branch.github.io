export function loadCharacterDetailView() {
    console.log("hit 2");
    const listView = document.getElementById("list-view");
    const detailView = document.getElementById("detail-view");
    listView.hidden = true;
    detailView.hidden = false;
    const characterName = document.getElementById("character-name");
    const characterImage = document.getElementById("character-image");
    characterName.innerHTML = name;
    characterImage.src = window.character.getCharacterImage();
    console.log("hit 3");
}
