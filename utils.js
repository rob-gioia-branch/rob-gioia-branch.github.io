export function loadCharacterDetailView() {
    const listView = document.getElementById("list-view");
    const detailView = document.getElementById("detail-view");
    listView.hidden = true;
    detailView.hidden = false;
    const characterName = document.getElementById("character-name");
    const characterImage = document.getElementById("character-image");
    characterName.innerHTML = window.character.getCharacterName();
    characterImage.src = window.character.getCharacterImage();
}
