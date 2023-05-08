export class Character {
    constructor(json) {
        this.name = json.name;
        this.image = json.images["lg"];
        this.qrCodeImage = json.images["sm"];
    }
    
    export function getCharacterName() {
        return name;
    }
    
    export function getCharacterImage() {
        return image;
    }
    
    export function getQRCodeImage() {
        return qrCodeImage;
    }
}
