export class Character {
    constructor(json) {
        this.name = json.name;
        this.image = json.images["lg"];
        this.qrCodeImage = json.images["sm"];
    }
    
    function getCharacterName() {
        return name;
    }
    
    function getCharacterImage() {
        return image;
    }
    
    function getQRCodeImage() {
        return qrCodeImage;
    }
}
