export class Character {
    constructor(json) {
        this.name = json.name;
        this.image = json.images["lg"];
        this.qrCodeImage = json.images["sm"];
    }
    
    getCharacterName() {
        return name;
    }
    
    getCharacterImage() {
        return image;
    }
    
    getQRCodeImage() {
        return qrCodeImage;
    }
}
